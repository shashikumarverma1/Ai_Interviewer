import React from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import SignInButton from './googleSignIn';
import { useRouter } from 'next/router';

const MenuSlider = ({ isMenuOpen, setIsMenuOpen, user, signOutUser }) => {
   const router = useRouter();
   const Navigate = (nav) => {
     router.push(`/${nav}`)
   }

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg z-50"
        >
          <div className="p-5 space-y-4">
            <button
              className="block w-full px-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={() => {
                Navigate('');
                setIsMenuOpen(false);
              }}
            >
              Home
            </button>

            {user && (
              <button
                className="block w-full px-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                onClick={() => {
                  Navigate('Interview');
                  setIsMenuOpen(false);
                }}
              >
                Start Interview
              </button>
            )}

            {user && (
              <button
                className="block w-full px-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                onClick={() => {
                  Navigate('Feedback');
                  setIsMenuOpen(false);
                }}
              >
                Feedback
              </button>
            )}

            <button
              className="block w-full px-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {!user ? (
                <div className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700">
                  <SignInButton />
                </div>
              ) : (
                <div className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700">
                  <button
                    onClick={() => {
                      signOutUser();
                      Navigate('');
                    }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuSlider;
