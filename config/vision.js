const vision = require('@google-cloud/vision');
require('dotenv').config();

const VISION_PROJECT_KEY = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY, //.replace(/\\n/g, '\n')
  // private_key:
  //   '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQClagt55ZA/Rwcf\n9CnECLfXa9ziGCOxmZFZ6L6ZNzIfVt+YuAe0hstmBwKg9J1mrIzkXQ8HmoFGf3uS\nqJPFj3eOWFk8801ed82oIlU/EkAVk1K6t3NdMAD4M54HIHTh52a+Lq0wcFvHgcYu\nM0J5+fRIyt5Kl0TGdYro7PI/hcGC/VUw3sr88s9c/346nSRLUa4AiLu3frl4X+r/\nTkpGJpuqMww0ldargGM8IeNKck5jJv+vS3FwfkIC/+LVOKPxAlSwf79Xdd4zGVK3\nu7GN01NOL4slCVmJJ93+6GKX5r3WbcCaaUH5Rupj9Sjzp7VuX4QegwZNzkzpsLR9\nkfjsTq4DAgMBAAECggEAJgR578G1xf1Wo170LHSOgEnvod1Hct2nPQFTsRYxBGfs\niwac6r5iSChLT9/4vyzgUuoadrZpiODq71mkYO8o3MPseqg2u4QQddiyPAU/SlYq\nWPSp5JyQVHtUkjHA+1y6TfKfZnckePWYLW0llbA/l21c6sraiTxhuUggIz5kK+0b\ncI/vMkt4YOy/zO4BUQMeX5sWZc1l/QPrLrM59vc3xR6z3xeVKcE4ePN32quJW7eB\nqLDbnF0rbFPfGeFYw+rji0vy3ObZ6umStZ+Ukk2X96dFI3OnNkNgWjK+dqOm3uqr\nWzJaTZJhXSUeyATL6zMK5GfFMR6VXSsqU/YCGqZYiQKBgQDmfADFEGXIParjOt75\npwMxSht+6HBf1Ke/82aZlzS5fdqisctPrKX08Cdgv5Se9Ba/Mj4cqEIjE4v/JboQ\nmsUXf5I+f2CMrWfJ/mBhEEBietxxObAi7GmXB79VneUlkB63SAibefGxhAJPdFm1\ntSW9IKGIyCQPvKJA7P9ZteflqwKBgQC3ue8miy3HtnA8pLu9j+mk68TTWfdzqWFv\nWc6cKFoDV+f8GFjNwrCeAFBkraq0rDmwnYFfrDiOKi1F2Wpj9wadcagUvpgn07I0\nDk43PsNU8Z/KQYm5ptZZkO/qmJEqxxgXumFOAoD2SwotetvjzKcRTGhKj9uajAMD\nZgJpOPXRCQKBgHEMp5ABD/tcjAIycQXA7mbxs3TW66+FbdZPu6ZgLQNCgMfGLzPg\nOfJfDOF+dpZUoQeczCxgNzhfMQ6v4YidcUiqUQAImEHIGB1SgNF7GCl1m8SJiCRJ\nEy16JlYHQUrgWsCJO3ePI4ZvenagWhQvSthuNe0SReXWHzt7Q3AsMhdLAoGBAJEL\nhkUcnbDMVAFcYCcAZYlg5MuifBvgvd5lvRpFNQLstGWuZvVSXZLvVoiVHm5yhTzs\nq8V3NlLt8z3wrfBrhdpobzSpX4AZvdcg8BjnQNhfxTGs2ekqUJD3PqErf3eRJHEf\nIFCw41UN2uQa2VwXJlIeyzsKJWn2XS6iqwadBFvZAoGAO/OpJu+RESsgRmZb8bbn\nuPXQXKzLk8u6GKk6L29KMfR6t9oZmeRBq6dPpiOY+zuwfudvFAce09ycaFVH2o+n\nRULBXXjcBkm33DYvp6HB+jCRdnBD505OV0BhMRz4vobNTH2Hn7H4Y+OXupMoe6yr\nkhubEKs36Rtdu/W+oaAUBVI=\n-----END PRIVATE KEY-----\n',
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER,
  client_x509_cert_url: process.env.CLIENT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};

// console.log('VISION_PROJECT_KEY', VISION_PROJECT_KEY.private_key);


const client = new vision.ImageAnnotatorClient({
  credentials: VISION_PROJECT_KEY,
});

module.exports = { VISION_PROJECT_KEY, client };
