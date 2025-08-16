
const globalConfig = {
    supabase: {
        url: process.env.NEXT_SUPABASE_URL || "https://xysrregjynemospdjeik.supabase.co",
        key: process.env.NEXT_SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5c3JyZWdqeW5lbW9zcGRqZWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NDM0MjcsImV4cCI6MjA2ODMxOTQyN30.9duq6M76s4Z1Dcy7Oj6osm7y_qXxLGNDbNKZ0ROKU44",
    },
}

export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_SIZE = 100;

export const platformConfig = {
    tiktok: {
        name: 'TikTok',
        className: 'border-tiktok-accent bg-tiktok-gradient',
        badgeClassName: 'bg-tiktok text-white',
        textClassName: 'bg-tiktok-gradient bg-clip-text text-transparent font-bold dark:text-yellow-400',
        mediaBadge: {
            video: 'bg-pink-600 text-white',
            image: 'bg-green-600 text-white',
            carousel: 'bg-purple-600 text-white'
        }
    },
    instagram: {
        name: 'Instagram',
        className: 'border-instagram-accent bg-instagram-gradient',
        badgeClassName: 'bg-instagram text-white',
        textClassName: 'bg-instagram-gradient bg-clip-text text-transparent font-bold dark:text-pink-400',
        mediaBadge: {
            video: 'bg-pink-600 text-white',
            image: 'bg-green-600 text-white',
            carousel: 'bg-purple-600 text-white'
        }
    },
    facebook: {
        name: 'Facebook',
        className: 'border-facebook-accent bg-facebook-gradient',
        badgeClassName: 'bg-facebook text-white',
        textClassName: 'bg-facebook-gradient bg-clip-text text-transparent font-bold dark:text-blue-400',
        mediaBadge: {
            video: 'bg-pink-600 text-white',
            image: 'bg-green-600 text-white',
            carousel: 'bg-purple-600 text-white'
        }
    }
};


export const colorConfig = {
    ads: {
        textClassName: 'bg-clip-text text-transparent font-bold bg-yellow-600',
        badgeClassName: 'text-white bg-yellow-600',
    },
    post: {
        textClassName: 'bg-clip-text text-transparent font-bold bg-blue-600',
        badgeClassName: 'text-white bg-blue-600',
    },
    video: {
        textClassName: 'bg-clip-text text-transparent font-bold',
        badgeClassName: 'text-white bg-pink-600',
    },
    image: {
        textClassName: 'bg-clip-text text-transparent font-bold',
        badgeClassName: 'text-white bg-green-600',
    },
    carousel: {
        textClassName: 'bg-clip-text text-transparent font-bold',
        badgeClassName: 'text-white bg-purple-600',
    },
    link: {
        textClassName: 'bg-clip-text text-transparent font-bold',
        badgeClassName: 'text-white bg-orange-600',
    },
    avatar: {
        textClassName: 'text-white bg-gray-600',
        badgeClassName: 'text-white bg-gray-600',
    }
}

export default globalConfig;