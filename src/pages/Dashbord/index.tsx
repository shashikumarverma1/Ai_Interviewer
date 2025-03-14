 'use client'

import React, { useEffect, useState } from 'react';
import { BarChart, Clock, ThumbsUp, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useGoogleAuth } from '@/hook/GoogleAuth';


// Example Usage

export async function getServerSideProps(context:any) {
  const {email}=context.query;
  const res = await fetch(`http://localhost:3000/api/hello`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }
  const data = await res.json();
  return {
    props: { data },
  };
}

const Dashboard = ({data}:{data:any}) => {
  const {user}=useGoogleAuth()



 console.log(data[0] , "jjjjjjjjjjj")
  return (
    <>
    <Navbar/>
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
                    <dd className="text-lg font-medium text-gray-900">2.5 hours</dd>
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
                    <dd className="text-lg font-medium text-gray-900">12</dd>
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
                    <dd className="text-lg font-medium text-gray-900">85%</dd>
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
                    <dd className="text-lg font-medium text-gray-900">3</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <div className="mt-4 bg-white shadow rounded-lg">
            <ul className="divide-y divide-gray-200">
              {[1, 2, 3].map((item) => (
                <li key={item} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Software Engineer Interview Practice</p>
                      <p className="text-sm text-gray-500">Completed 2 days ago</p>
                    </div>
                    <div className="text-sm text-indigo-600">Score: 88%</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  
  );
};

export default Dashboard;