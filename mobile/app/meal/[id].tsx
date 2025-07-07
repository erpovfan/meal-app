import { useFetch } from "@/hooks/useFetch";
import { mealFunc } from "@/services/mealApi";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
const Meal = () => {
  const { id } = useLocalSearchParams();
  const [strMealThumb, setstrMealThumb] = useState("");
  const [strMeal, setstrMeal] = useState("");
  const [idMeal, setidMeal] = useState("");
  const [saved, setsaved] = useState(false);

  const [enableInstruction, setenableInstruction] = useState(false);
  const [enableIngredients, setenableIngredients] = useState(false);

  const video = useRef(null);
  const { data, loading, error, FetchData, reset } = useFetch(
    () => mealFunc.MealbyId(id.toString()),
    true
  );

  const handlesave = async () => {
    const res = await fetch("http://192.168.100.6:3000/api/user/addfavor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idMeal, strMeal, strMealThumb }),
    });
    const data = await res.json();
    if (res.ok) {
      setsaved(true);
    }
    if (!res.ok) {
      console.log("error");
    }
    if (res.status === 300) {
      setsaved(false);
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setidMeal(data[0].idMeal);
      setstrMeal(data[0].strMeal);
      setstrMealThumb(data[0].strMealThumb);
    }
  }, [data]);

  useEffect(() => {
    if (!idMeal) return;
    try {
      const Check = async () => {
        console.log("1");
        const res = await fetch(
          `http://192.168.100.6:3000/api/user/existfavor?idMeal=${idMeal}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("2");
        const data = await res.json();
        console.log("3");
        console.log(data);
        setsaved(data.exist);
      };
      Check();
    } catch (error) {
      console.log("dsds");
    }
  }, [idMeal]);
  console.log(idMeal);
  return (
    <>
      {data && data.length > 0 && (
        <View className="w-full flex-1">
          <ScrollView
            className="w-full h-full"
            contentContainerStyle={{
              width: "100%",
            }}
          >
            <View className="z-0 relative w-full h-[30rem] b">
              <Image
                source={{
                  uri: data[0].strMealThumb,
                }}
                className="w-full h-[30rem]"
                resizeMode="cover"
              />

              <View className="absolute  bottom-0  h-[30rem] w-full bg-[#21343441] flex flex-col justify-between">
                <View className="flex flex-row justify-between">
                  <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons
                      name="arrow-back"
                      size={30}
                      className="pl-5 pt-10"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handlesave()}>
                    <Ionicons
                      size={30}
                      name={saved ? "bookmark" : "bookmark-outline"}
                      className="pr-5 pt-10"
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text className="text-white text-[1.5rem]  text-center w-[5rem] font-bold bg-blue-700 rounded-2xl">
                    {data[0].strCategory}
                  </Text>
                  <Text className="text-white text-[1.2rem]">
                    {data[0].strMeal}
                  </Text>
                  <Text className="text-white text-[1.2rem]">
                    {data[0].strArea}
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex flex-row flex-1  w-full justify-center gap-x-10   pt-10 rounded-t-2xl z-10  ">
              <View className="border-[1px] border-[#485398] rounded-lg w-[10rem] flex flex-col items-center justify-center h-[10rem]">
                <Image
                  source={require("@/assets/images/timer.png")}
                  className="size-[4rem]"
                />
                <Text className="text-[1.2rem] text-blue-700 font-bold pt-2">
                  {data[0].strArea}
                </Text>
              </View>
              <View className="border-[1px] border-[#485398] rounded-lg w-[10rem] flex flex-col items-center justify-center h-[10rem]">
                <Image
                  source={require("@/assets/images/serving.png")}
                  className="size-[4rem]"
                />
                <Text className="text-[1.2rem] text-blue-700 font-bold pt-2">
                  4 person
                </Text>
              </View>
            </View>

            <View className="w-full my-7 ">
              <TouchableOpacity
                className="w-[80%] mx-auto"
                onPress={() => setenableInstruction(!enableInstruction)}
              >
                <Text className="text-[1.5rem] font-[600] bg-slate-600 text-center rounded-sm py-2 ">
                  Instructions
                </Text>
              </TouchableOpacity>
            </View>
            {enableInstruction && (
              <View className="w-full ">
                <Text className="text-center leading-6 text-[1.2rem]">
                  {data[0].strInstructions}
                </Text>
              </View>
            )}

            <View className="w-full mt-5 mb-5">
              <TouchableOpacity
                className="w-[80%] mx-auto"
                onPress={() => setenableIngredients(!enableIngredients)}
              >
                <Text className="text-[1.5rem] font-[600] bg-slate-600 text-center rounded-sm py-2 ">
                  Ingredient
                </Text>
              </TouchableOpacity>
            </View>

            {enableIngredients && (
              <View className="w-full">
                {Array.from({ length: 30 }, (_, i) => {
                  const ingreditent = data[0][`strIngredient${i + 1}`];
                  const Measure = data[0][`strMeasure${i + 1}`];
                  return ingreditent ? (
                    <Text
                      className="text-center text-[1.2rem] bg-slate-500 my-2"
                      key={i}
                    >
                      {ingreditent} : {Measure}
                    </Text>
                  ) : null;
                })}
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default Meal;
