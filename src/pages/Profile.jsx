import Header from "../components/navbar/header";
import NavBar from "../components/navbar/home-nav";
import TrendingSection from "../components/navbar/trending";
import ProfilePage from "../components/profile-page";

export default function Profile() {
  return (
    <>
      <div className="container mt-2 mx-2 w-full">
        {/* Header*/}
        <Header />

        {/* Main Content */}
        <div className="flex">
          {/* Left Side */}
          <div className="min-w-80 sm:w-2/12 md:w-3/12">
            <NavBar />
          </div>

          {/* Middle */}
          <div className="w-10/12 sm:w-10/12 md:w-7/12 mx-1">
            <ProfilePage />
          </div>

          {/* Right Side */}
          <div className="w-0 sm:w-0 md:w-2/12">
            <TrendingSection />
          </div>
        </div>
      </div>
    </>
  );
}
