/** @type {import('next').NextConfig} */
const nextConfig = {
	serverExternalPackages: ["pg", "@prisma/adapter-pg", "@prisma/client"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.pexels.com",
			},
			{
				protocol: "https",
				hostname: "cdn.pixabay.com",
			},
		],
	},
};

module.exports = nextConfig;
