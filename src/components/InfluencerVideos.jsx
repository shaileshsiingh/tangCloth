import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const influencerVideos = [
  {
    id: 1,
    title: "Luxury Fashion Haul | Tangerine Luxury",
    influencer: "@fashionista_diaries",
    thumbnail: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.instagram.com/reel/C7D7vway-sR/?igsh=eXVheWhtNXZhN3ps",
    description: "Unboxing the most luxurious pieces from Tangerine Luxury's latest collection"
  },
  {
    id: 2,
    title: "Summer Collection Styling Tips",
    influencer: "@style_with_me",
    thumbnail: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.instagram.com/reel/DHOFqG2ykb7/?igsh=ZmVzZXo0NnFqbHh6",
    description: "How to style Tangerine Luxury's summer collection for different occasions"
  },
  {
    id: 3,
    title: "Luxury Fashion Review",
    influencer: "@luxury_lover",
    thumbnail: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.instagram.com/reel/DAA23D6SYAN/?igsh=ZzVtZ2F2aHQ2cTU3",
    description: "Detailed review of Tangerine Luxury's premium collection"
  },
  {
    id: 4,
    title: "Street Style Inspiration",
    influencer: "@urban_fashion",
    thumbnail: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.instagram.com/reel/DALZ55uSHfP/?igsh=c2JueGVsZ2F5cnJt",
    description: "Street style looks featuring Tangerine Luxury's latest pieces"
  },
  {
    id: 5,
    title: "Luxury Fashion Tips",
    influencer: "@fashion_expert",
    thumbnail: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.instagram.com/reel/Cy-38mbSYwl/?igsh=OWhidXE3bDhjcGho",
    description: "Expert tips on styling Tangerine Luxury's collection"
  },
  {
    id: 6,
    title: "Fashion Haul & Review",
    influencer: "@style_icon",
    thumbnail: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    videoUrl: "https://www.instagram.com/reel/CzJA0_Sy1ml/?igsh=MWQwdXRoaWozZ2F6cw==",
    description: "Complete haul and review of Tangerine Luxury's new arrivals"
  }
];

function InfluencerVideos() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const handleVideoClick = (videoUrl) => {
    window.open(videoUrl, '_blank');
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section ref={ref} className="py-20" style={{backgroundColor:'#FAF9F6'}}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Influencer Style Guides</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get inspired by our fashion influencers as they showcase the latest trends and styling tips from Tangerine Luxury
          </p>
        </motion.div>

        <div className="px-4">
          <Slider {...settings}>
            {influencerVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="px-4"
              >
                <div 
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => handleVideoClick(video.videoUrl)}
                >
                  <div className="relative aspect-video">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-white rounded-full p-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                    <p className="text-gray-600 mb-2">by {video.influencer}</p>
                    <p className="text-sm text-gray-500">{video.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default InfluencerVideos; 