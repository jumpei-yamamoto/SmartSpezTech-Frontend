import React from "react";

const RightSidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Company Information */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="text-center">
          <img
            src="https://via.placeholder.com/50"
            alt="Company Logo"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h3 className="text-lg font-bold mb-2">AliThemes</h3>
          <p className="text-gray-600">New York, US</p>
          <a href="#" className="text-blue-500 hover:underline">
            02 Open Jobs
          </a>
        </div>
        <div className="mt-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345090004!2d144.95373631531532!3d-37.817209979751504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43d2f1f6b1%3A0xc02cb7e1b1d6a0b1!2sVictoria%20State%20Library!5e0!3m2!1sen!2sau!4v1637740657240!5m2!1sen!2sau"
            width="100%"
            height="200"
            className="rounded-lg"
            allowFullScreen={false}
            loading="lazy"
          ></iframe>
        </div>
        <div className="mt-4 text-gray-600">
          <p className="mb-2">
            <i className="fas fa-map-marker-alt mr-2"></i>
            205 North Michigan Avenue, Suite 810 Chicago, 60601, USA
          </p>
          <p className="mb-2">
            <i className="fas fa-phone-alt mr-2"></i>
            (123) 456-7890
          </p>
          <p className="mb-2">
            <i className="fas fa-envelope mr-2"></i>
            Email: contact@Evara.com
          </p>
        </div>
      </div>

      {/* Similar Jobs */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold mb-4">Similar jobs</h3>
        <ul className="space-y-4">
          <li className="flex justify-between">
            <div>
              <h4 className="font-bold text-sm">UI/UX Designer fulltime</h4>
              <p className="text-gray-600 text-xs">New York, US</p>
            </div>
            <div className="text-right">
              <p className="text-green-500 font-bold">$250/Hour</p>
              <p className="text-gray-500 text-xs">3 mins ago</p>
            </div>
          </li>
          <li className="flex justify-between">
            <div>
              <h4 className="font-bold text-sm">Java Software Engineer</h4>
              <p className="text-gray-600 text-xs">Tokyo, Japan</p>
            </div>
            <div className="text-right">
              <p className="text-green-500 font-bold">$500/Hour</p>
              <p className="text-gray-500 text-xs">5 mins ago</p>
            </div>
          </li>
          <li className="flex justify-between">
            <div>
              <h4 className="font-bold text-sm">Frontend Developer</h4>
              <p className="text-gray-600 text-xs">Hanoi, Vietnam</p>
            </div>
            <div className="text-right">
              <p className="text-green-500 font-bold">$650/Hour</p>
              <p className="text-gray-500 text-xs">8 mins ago</p>
            </div>
          </li>
          <li className="flex justify-between">
            <div>
              <h4 className="font-bold text-sm">Cloud Engineer</h4>
              <p className="text-gray-600 text-xs">Losangl, AU</p>
            </div>
            <div className="text-right">
              <p className="text-green-500 font-bold">$380/Hour</p>
              <p className="text-gray-500 text-xs">12 mins ago</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RightSidebar;
