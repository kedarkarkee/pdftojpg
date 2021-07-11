## Before you begin

1. Install Node, React, npm, yarn , ghostscript, imagemagick, graphicksmagick and ffmpeg

## Folder Structure

The folder "client" is the frontend and all folders except it are backend.

## Deploying on other servers?

# Client Side Setup
1. Open up a terminal on client directory
2. Run <code>yarn install</code>
3. Change the baseUrl and clientUrl on client/src/utils/axios.ts
4. Run <code>yarn build</code>
5. Production code will be generated on client/build directory.

# Server Side Setup
1. Open up a terminal on root directory
2. Run <code>npm install</code>
3. Edit .env file for changing S3 buckets, users and the server PORT
4. Run <code>npm start</code> to run the server.