import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useEffect } from "react";

const Display = () => {
  const [value, setValue] = React.useState("");
  const [selectedCountry, setSelectedCountry] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [weatherData, setWeatherData]: any = React.useState(null);
  const [error, setError] = React.useState(false);
  async function dataFetching(value: string) {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${"139e841018eb4338f57b7601d740af2c"}`
      );
      const data = await response.json();
      if (data) {
        setWeatherData(data);
        setLoading(false);
        console.log(data);
        setError(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }
  useEffect(() => {
    dataFetching("bangladesh");
    return () => {
      setWeatherData(null);
    }
  }, []);
  function handleSubmit(e: any) {
    e.preventDefault();

   if(value){
    dataFetching(value);
    setValue("");
   }
   else if(selectedCountry){
    dataFetching(selectedCountry);
   }
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="mt-64 flex justify-center items-center ">
        <div className="mr-20">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Weather Generator</CardTitle>
              <CardDescription>
                Generate weather forecast by location
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action="" onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label htmlFor="name">Location</label>
                  <Input
                    placeholder="Search..."
                    id="name"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>

                <label htmlFor="countries">Countries</label>
                <Select onValueChange={setSelectedCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="usa">United States</SelectItem>
                    <SelectItem value="bangladesh">Bangladesh</SelectItem>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="nepal">Nepal</SelectItem>
                    <SelectItem value="japan">Japan</SelectItem>
                    <SelectItem value="russia">Russia</SelectItem>
                    <SelectItem value="england">England</SelectItem>
                    <SelectItem value="canada">Canada</SelectItem>
                    <SelectItem value="france">France</SelectItem>
                  </SelectContent>
                </Select>
                <CardFooter className="flex justify-between mt-5">
                  <Button variant="outline">Cancel</Button>
                  <Button type="submit">Deploy</Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
        <div>
          {loading ? (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle></CardTitle>
                  <CardDescription>
                    Generate weather forecast by location
                  </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </div>
          ) : (
            <div>
              <Card className="w-auto h-[335px]">
                <CardHeader>
                  <CardTitle>Weather Details</CardTitle>
                  <CardDescription>
                    Generate weather forecast by location
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="text-lg font-bold">
                    Location: {weatherData?.name}
                  </p>
                  <p className="text-4xl font-bold">
                    {" "}
                    {weatherData?.main?.temp} C
                  </p>
                  <p>Weather: {weatherData?.weather[0]?.description}</p>
                  <p>Humidity: {weatherData?.main?.humidity}</p>
                  <p>Wind Speed : {weatherData?.wind?.speed}</p>
                  <p>Clouds : {weatherData?.clouds?.all}</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Display;
