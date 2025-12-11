import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  
  // Safe fallback jika data tidak lengkap
  const imageSrc = Img || "/placeholder.jpg";
  const titleText = Title || "Untitled Project";
  const descText = Description || "No description available";
  const liveDemo = ProjectLink && ProjectLink.trim() !== "" ? ProjectLink : null;
  const detailPage = id ? `/project/${id}` : null;

  // Handle live demo click
  const handleLiveDemo = (e) => {
    if (!liveDemo) {
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };

  // Handle details click
  const handleDetails = (e) => {
    if (!detailPage) {
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    <div className="group relative w-full">
      
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20">
        
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

        <div className="relative p-5 z-10">

          {/* Project Image */}
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={imageSrc}
              alt={titleText}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Info Section */}
          <div className="mt-4 space-y-3">

            {/* Title */}
            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
              {titleText}
            </h3>

            {/* Description */}
            <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-2">
              {descText}
            </p>

            {/* Buttons */}
            <div className="pt-4 flex items-center justify-between">

              {/* Live Demo */}
              {liveDemo ? (
                <a
                  href={liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  <span className="text-sm font-medium">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-gray-500 text-sm">Demo Not Available</span>
              )}

              {/* Details */}
              {detailPage ? (
                <Link
                  to={detailPage}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95"
                  // onClick={handleDetails}
                >
                {/*  <span className="text-sm font-medium">Details</span>
                  <ArrowRight className="w-4 h-4" />*/}
                </Link>
              ) : (
                <span className="text-gray-500 text-sm">Details Not Available</span>
              )}

            </div>
          </div>

          <div className="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
        </div>

      </div>
    </div>
  );
};

export default CardProject;
