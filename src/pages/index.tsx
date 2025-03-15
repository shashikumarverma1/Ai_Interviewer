import React, { useState } from 'react';
import { Brain, Users, BarChart, Award } from 'lucide-react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import SignInButton from '@/components/googleSignIn';
import { useGoogleAuth } from '@/hook/GoogleAuth';
import SpeechToText from '@/components/speechTotext';

const Home = () => {
  const router = useRouter();
 const {user}=useGoogleAuth()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar/>
      {/* Hero Section */}
      <SpeechToText/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Master Your Interviews with</span>
          <span className="block text-indigo-600">AI-Powered Practice</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Practice interviews with our advanced AI system. Get real-time feedback, improve your skills, and boost your confidence.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
          <button
      onClick={() => {
        if(user){
          router.push('/Interview')
        }
       
      }}
      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
    >
      Start Practice Interview
    </button>
          </div>

          {
            !user &&    <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <div
              // onClick={() => router.push('/Login')}
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
            >
          <SignInButton/>
            </div>
          </div>
          }
       
        </div>
     
    
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to succeed
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <Brain className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">AI-Powered Questions</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Dynamic questions tailored to your experience level and job role.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <Users className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Real-time Feedback</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Get instant feedback on your responses and areas for improvement.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <BarChart className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Detailed Analytics</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Track your progress and identify areas for improvement.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <Award className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Industry Standards</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Questions aligned with current industry requirements and best practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


