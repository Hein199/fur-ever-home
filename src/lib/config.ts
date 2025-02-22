const config = {
  env: {
    apiEndpoint: process.env.NEXT_PUBLIC_API_URL!,
    imagekit: {
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
      privateKey: process.env.PRIVATE_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
    },
  },
};

export default config;
