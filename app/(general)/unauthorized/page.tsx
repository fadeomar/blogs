/* eslint-disable @next/next/no-html-link-for-pages */

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Animated Shield Icon */}
      <div className="mb-8 animate-bounce">
        <svg
          className="h-32 w-32 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center relative overflow-hidden">
        {/* Gradient Background Effect */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-r from-red-100 to-pink-100 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-r from-red-100 to-pink-100 rounded-full" />

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          401 Unauthorized
        </h1>
        <p className="text-gray-600 mb-6">
          Oops! It seems you&apos;ve ventured into restricted territory. 🔒
        </p>
        <p className="text-gray-500 text-sm mb-8">
          You don&apos;t have permission to access this page. Please contact
          your administrator or return to the homepage.
        </p>

        {/* Action Button */}
        <a
          href="/"
          className="inline-block px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition duration-300 transform hover:scale-105"
        >
          Back to Safety
        </a>
      </div>

      {/* Optional Legal Text */}
      <p className="mt-8 text-sm text-gray-400 text-center">
        Unauthorized access is prohibited. All activities are monitored.
      </p>
    </div>
  );
}
