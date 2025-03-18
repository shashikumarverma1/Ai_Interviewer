import React from 'react';
import { Brain, Menu } from 'lucide-react';
import { useRouter } from 'next/router';
import SignInButton, { signOutUser } from './googleSignIn';
import { useGoogleAuth } from '@/hook/GoogleAuth';
import MenuSlider from './Slider';

const Navbar = () => {
  const { user } = useGoogleAuth()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();
  const Navigate = (nav: string) => {
    router.push(`/${nav}`)
  }
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button
              onClick={() => {
                Navigate('')
              }}
              className="flex items-center">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AI Interview Pro</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <button
              onClick={() => {
                Navigate('')
              }}
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </button>

            {
              user && <button
                onClick={() => {
                  Navigate('Interview')
                }}
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Start Interview
              </button>
            }

            {
              user && <button
                onClick={() => {
                  Navigate('Feedback')
                }}
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Feedback
              </button>
            }

            {
              !user ? <div

                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700">
                <SignInButton />
              </div> : <div

                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700">
                <button onClick={() => {
                  signOutUser()
                  Navigate("")
                }}>Sign out</button>
              </div>
            }

          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {/* {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <button

              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={() => {
                Navigate('')
                setIsMenuOpen(false)
              }}
            >
              Home
            </button>
            {
              user && <button
                // to="/interview"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                onClick={() => {

                  Navigate('Interview')
                  setIsMenuOpen(false)
                }}
              >
                Start Interview
              </button>
            }
            {
              user && <button
                // to="/dashboard"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                onClick={() => {
                  Navigate('Feedback')
                  setIsMenuOpen(false)
                }}
              >
                Feedback
              </button>
            }
            <button
              // to="/login"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {
                !user ? <div

                  className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700">
                  <SignInButton />
                </div> : <div

                  className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700">
                  <button onClick={() => {
                    signOutUser()
                    Navigate("")
                  }}>Sign out</button>
                </div>
              }
            </button>
          </div>
        </div>
      )} */}
      <MenuSlider isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} user={user} signOutUser={signOutUser}/>
    </nav>
  );
};

export default Navbar;