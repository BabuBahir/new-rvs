module.exports = {
  'development': {
    'secret': 'bolbona',
    'database': 'mongodb://test:test@ds157248.mlab.com:57248/rvs',
    //'database': 'mongodb://localhost:27017/donatemytime',
    'apiPath' : '/api/v1',
    'siteUrl': 'http://localhost:3000'
  },
  'production': {
    'secret': '059a53cab2f21hjj1e6b53ad7182f354492',
    //'database': 'mongodb://localhost:27017/donatemytime',
    'database' : 'mongodb://test:test@ds157248.mlab.com:57248/rvs',
    'apiPath' : '/api/v1',
    'siteUrl': 'https://rvs-staging.herokuapp.com/'
  }
};
