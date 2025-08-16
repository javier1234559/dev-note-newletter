import { SocialPost } from "@/components/SocialPostCard";
import tiktokPost1 from "@/assets/tiktok-post-1.jpg";
import instagramPost1 from "@/assets/instagram-post-1.jpg";
import facebookPost1 from "@/assets/facebook-post-1.jpg";

// Generate mock data for 50 social media posts
export const mockPosts: SocialPost[] = [
  // TikTok Posts
  {
    id: "tiktok-1",
    platform: "tiktok",
    title: "Fashion Trends for Summer 2024",
    description: "Check out the hottest fashion trends that are taking over social media this summer!",
    imageUrl: tiktokPost1.src,
    externalUrl: "https://tiktok.com/@fashionista/video/12345",
    date: new Date("2024-07-10"),
    likes: 125000,
    comments: 3400,
    shares: 8900,
    author: "@fashionista"
  },
  {
    id: "tiktok-2",
    platform: "tiktok",
    title: "DIY Home Decor Hacks",
    description: "Transform your space with these amazing DIY decorating ideas that won't break the bank",
    imageUrl: tiktokPost1.src,
    externalUrl: "https://tiktok.com/@homedecor/video/12346",
    date: new Date("2024-07-08"),
    likes: 89000,
    comments: 2100,
    shares: 5600,
    author: "@homedecor_queen"
  },
  {
    id: "tiktok-3",
    platform: "tiktok",
    title: "Quick Workout Routine",
    description: "Get fit in just 15 minutes with this high-intensity workout routine",
    imageUrl: tiktokPost1.src,
    externalUrl: "https://tiktok.com/@fitness/video/12347",
    date: new Date("2024-07-05"),
    likes: 234000,
    comments: 8900,
    shares: 15600,
    author: "@fitness_coach"
  },

  // Instagram Posts
  {
    id: "instagram-1",
    platform: "instagram",
    title: "Healthy Breakfast Bowl",
    description: "Start your day right with this colorful and nutritious breakfast bowl recipe",
    imageUrl: instagramPost1.src,
    externalUrl: "https://instagram.com/p/healthy-breakfast",
    date: new Date("2024-07-12"),
    likes: 45600,
    comments: 890,
    shares: 1200,
    author: "@healthy_eats"
  },
  {
    id: "instagram-2",
    platform: "instagram",
    title: "Sunset Photography Tips",
    description: "Capture stunning sunset photos with these professional photography techniques",
    imageUrl: instagramPost1.src,
    externalUrl: "https://instagram.com/p/sunset-tips",
    date: new Date("2024-07-09"),
    likes: 78900,
    comments: 1500,
    shares: 2300,
    author: "@photo_pro"
  },
  {
    id: "instagram-3",
    platform: "instagram",
    title: "Weekend Coffee Setup",
    description: "Creating the perfect coffee corner for your weekend morning routine",
    imageUrl: instagramPost1.src,
    externalUrl: "https://instagram.com/p/coffee-setup",
    date: new Date("2024-07-06"),
    likes: 34500,
    comments: 567,
    shares: 890,
    author: "@coffee_lover"
  },

  // Facebook Posts
  {
    id: "facebook-1",
    platform: "facebook",
    title: "Team Building Success Story",
    description: "How our company achieved 50% better collaboration through innovative team building activities",
    imageUrl: facebookPost1.src,
    externalUrl: "https://facebook.com/business/post/team-building",
    date: new Date("2024-07-11"),
    likes: 12300,
    comments: 245,
    shares: 567,
    author: "TechCorp Solutions"
  },
  {
    id: "facebook-2",
    platform: "facebook",
    title: "Remote Work Best Practices",
    description: "Essential tips for maintaining productivity and work-life balance in remote environments",
    imageUrl: facebookPost1.src,
    externalUrl: "https://facebook.com/business/post/remote-work",
    date: new Date("2024-07-07"),
    likes: 8900,
    comments: 178,
    shares: 334,
    author: "Future Workspace"
  },
  {
    id: "facebook-3",
    platform: "facebook",
    title: "Digital Marketing Trends",
    description: "The latest trends shaping digital marketing strategies for 2024 and beyond",
    imageUrl: facebookPost1.src,
    externalUrl: "https://facebook.com/business/post/marketing-trends",
    date: new Date("2024-07-04"),
    likes: 15600,
    comments: 298,
    shares: 445,
    author: "Marketing Masters"
  }
];

// Generate additional posts to reach 50 total
const additionalPosts: SocialPost[] = [];
const platforms = ['tiktok', 'instagram', 'facebook'] as const;
const titles = [
  "Creative Content Ideas",
  "Lifestyle Tips & Tricks",
  "Behind the Scenes Look",
  "Product Review Highlights",
  "Daily Inspiration Quotes",
  "Travel Photography",
  "Cooking Masterclass",
  "Tech News Update",
  "Art & Design Showcase",
  "Music & Entertainment"
];

for (let i = 4; i <= 50; i++) {
  const platform = platforms[i % 3];
  const titleIndex = (i - 4) % titles.length;
  const daysAgo = Math.floor(Math.random() * 30) + 1;

  const imageUrl = platform === 'tiktok' ? tiktokPost1 :
    platform === 'instagram' ? instagramPost1 : facebookPost1;

  additionalPosts.push({
    id: `${platform}-${i}`,
    platform,
    title: titles[titleIndex],
    description: `Engaging content about ${titles[titleIndex].toLowerCase()} that captures audience attention`,
    imageUrl: imageUrl.src,
    externalUrl: `https://${platform}.com/post/${i}`,
    date: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
    likes: Math.floor(Math.random() * 100000) + 1000,
    comments: Math.floor(Math.random() * 5000) + 100,
    shares: Math.floor(Math.random() * 10000) + 200,
    author: `@creator_${i}`
  });
}

export const allMockPosts = [...mockPosts, ...additionalPosts];