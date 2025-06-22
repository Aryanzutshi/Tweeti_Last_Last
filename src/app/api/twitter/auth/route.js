import { OAuth } from 'oauth';

const oauth = new OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  process.env.TWITTER_CONSUMER_KEY,
  process.env.TWITTER_CONSUMER_SECRET,
  '1.0A',
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/twitter/callback`, 
  'HMAC-SHA1'
);

// In-memory token storage (temporary, for demo only)
global.requestTokens = global.requestTokens || {};

export async function GET(req) {
  return new Promise((resolve) => {
    oauth.getOAuthRequestToken((err, oauthToken, oauthTokenSecret) => {
      if (err) {
        return resolve(
          new Response(JSON.stringify({ error: 'OAuth request error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          })
        );
      }

      global.requestTokens[oauthToken] = oauthTokenSecret;

      const redirectUrl = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}`;

      return resolve(Response.redirect(redirectUrl));
    });
  });
}
