import { TwitterApi } from 'twitter-api-v2';
import { OAuth } from 'oauth';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const oauth_token = searchParams.get('oauth_token');
  const oauth_verifier = searchParams.get('oauth_verifier');

  const tokenSecret = global.requestTokens?.[oauth_token];

  if (!tokenSecret) {
    return new Response(JSON.stringify({ error: 'Invalid or expired token' }), { status: 400 });
  }

  const oauth = new OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.TWITTER_CONSUMER_KEY,
    process.env.TWITTER_CONSUMER_SECRET,
    '1.0A',
    null,
    'HMAC-SHA1'
  );

  return new Promise((resolve) => {
    oauth.getOAuthAccessToken(
      oauth_token,
      tokenSecret,
      oauth_verifier,
      async (err, accessToken, accessSecret) => {
        if (err) {
          return resolve(
            new Response(JSON.stringify({ error: 'Access token exchange failed' }), { status: 500 })
          );
        }

        const client = new TwitterApi({
          appKey: process.env.TWITTER_CONSUMER_KEY,
          appSecret: process.env.TWITTER_CONSUMER_SECRET,
          accessToken,
          accessSecret,
        });

        try {
          const tweet = await client.v2.tweet('Hello from Tweeti! 🚀');
          const user = await client.v1.verifyCredentials();

          return resolve(
            new Response(
              JSON.stringify({
                tweet,
                accessToken,
                accessSecret,
                twitterUsername: user.screen_name,
                twitterId: user.id_str,
                profileImage: user.profile_image_url_https,
              }),
              { status: 200 }
            )
          );
        } catch (e) {
          return resolve(new Response(JSON.stringify({ error: 'Tweet/user fetch failed' }), { status: 500 }));
        }
      }
    );
  });
}