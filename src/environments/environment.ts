export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyCERR5IezBlScdOf2wldjNzAZtG54lqKqk',
    signUpUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
    logInUrl:
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
    recipesDatabaseUrl:
      'https://angular-recipe-app-7b643-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
  },
  edamam: {
    apiUrl: 'https://api.edamam.com/api/recipes/v2',
    appId: '705d72a2',
    appKey: '4bff3e6321ec1d6cf2b142c57cb035ee',
  },
};
