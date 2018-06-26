const SERVER_ENV = {
<<<<<<< HEAD
    'production': {
        'SERVER_PORT': process.env.IWIP_SERVER_PORT || 4800
        // 'SERVER_PORT': process.env.PORT || 4800
    },
    'preproduction': {
        'SERVER_PORT': 4800
    },
    'development': {
        'SERVER_PORT': 4800
    }
=======
  production: {
    SERVER_PORT: process.env.IWIP_SERVER_PORT || 4800
    // 'SERVER_PORT': process.env.PORT || 4800
  },
  preproduction: {
    SERVER_PORT: 4800
  },
  development: {
    SERVER_PORT: 4800
  }
>>>>>>> bc49dcba05d44fb0094688d5830f7147dc23aa8f
};

export default SERVER_ENV;
