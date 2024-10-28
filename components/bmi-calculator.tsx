'use client'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useState, ChangeEvent } from 'react'

import React from 'react'

interface bmiResult {
  bmi: string;
  category: string;
}

const BMICalculatorPage = () => {
  const [height, setHeight] = useState<string>("")
  const [weight, setWeight] = useState<string>("")
  const [result, setResult] = useState<bmiResult | null>(null)
  const [error, setError] = useState<string>("")

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setHeight(e.target.value)
  }

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setWeight(e.target.value)
  }

  const calculateBmi = () => {
    if (!height || !weight) {
      setError("Please enter height and weight");
      return;
    }
    
    const heightInMeters = parseFloat(height) / 100;
    if (heightInMeters <= 0) {
      setError('Height must be a positive number');
      return;
    }

    const weightInKg = parseFloat(weight);
    if (weightInKg <= 0) {
      setError('Weight must be a positive number');
      return;
    }

    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    let category = "";

    if (bmiValue < 18.5) {
      category = 'Underweight';
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = "Normal weight";
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }

    setResult({ bmi: bmiValue.toFixed(1), category });
    setError('');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <Card className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 shadow-2xl rounded-lg transform transition hover:scale-105 duration-300 ease-in-out">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">BMI Calculator</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-300 mt-2">
            Enter your height and weight to calculate your BMI.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 mt-4">
          <div className="grid gap-4">
            <Label htmlFor="height" className="text-lg font-medium text-gray-800 dark:text-gray-200">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="Enter your height"
              value={height}
              onChange={handleHeightChange}
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div className="grid gap-4">
            <Label htmlFor="weight" className="text-lg font-medium text-gray-800 dark:text-gray-200">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="Enter your weight"
              value={weight}
              onChange={handleWeightChange}
              className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <Button
            onClick={calculateBmi}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Calculate
          </Button>
          {error && (
            <div className="text-red-500 text-center font-semibold mt-4">{error}</div>
          )}
          {result && (
            <div className="text-center space-y-4 mt-4">
              <div className="text-4xl font-bold text-gray-900 dark:text-white">{result.bmi}</div>
              <div className={`text-xl font-semibold ${result.category === 'Normal weight' ? 'text-green-600' : 'text-red-500'}`}>
                {result.category}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default BMICalculatorPage
