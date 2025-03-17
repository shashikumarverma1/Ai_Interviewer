'use client'

import React, { useEffect, useState } from 'react';
import { BarChart, Clock, ThumbsUp, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useGoogleAuth } from '@/hook/GoogleAuth';
import FeedbackCard from '@/components/FeedbackCard';
import AuthGuard from '../authGuard';
import LoadingScreen from '@/components/lodingscreen';




const Dashboard = () => {
  const { user } = useGoogleAuth()
  const [data, setData] = useState([])
  const [questionCount, setQuestionCount] = useState(0)
  const [InterviewCount, setInterviewCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const GetData = async () => {
    const res = await fetch(`http://localhost:3000/api/getInterviewresult`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user?.email }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
      setLoading(false)
    }
    const data = await res.json();
    setData(data)
    setQuestionCount(data[0]?.length)
    setInterviewCount(data[1]?.length)
    setLoading(false)
  }

  useEffect(() => {
    if (user) {
      GetData()
    }

  }, [user])

  if (loading) {
    return (
      <LoadingScreen />
    )
  }
  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Interview Dashboard</h1>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Practice Time</dt>
                      <dd className="text-lg font-medium text-gray-900">{5 * questionCount} min</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BarChart className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Interviews Completed</dt>
                      <dd className="text-lg font-medium text-gray-900">{InterviewCount}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ThumbsUp className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Average Score</dt>
                      <dd className="text-lg font-medium text-gray-900">  {data[1]?.avgScore}%</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Areas to Improve</dt>
                      <dd className="text-lg font-medium text-gray-900">{ data[1]?.weaknesses}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Detail Result</h2>
            <div className="mt-4 bg-white shadow rounded-lg">
              <ul className="divide-y divide-gray-200">
                {questionCount > 0 && data[0]?.map((item, index) => {
                 
                  return (
                    <FeedbackCard data={item} index={index} key={index} />
                  )
                }

                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default AuthGuard(Dashboard);