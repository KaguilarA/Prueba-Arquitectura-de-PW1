//- Función que se ejecuta automáticamente
(() => {

    //- modo estricto de JS
    'use strict';

    //- Invocamos a AngulaJS, se le establece un rol dentro de la aplicación (.module) y un nombre para el mismo (.config)
    angular
    .module('appRoutes', ['ui.router', 'oc.lazyLoad', 'angularCSS'])
    .config(configuration);

    //- Se inyectan las dependencias necesarias para el funcionamiento correcto de la aplicación
    configuration.$inject = ['$stateProvider', '$urlRouterProvider'];

    //- Se crea la función que recibe como parametro las dependencias que se inyectan
    function configuration($stateProvider, $urlRouterProvider, $ocLazyLoad){
        
        $stateProvider

        //- Se crea un "estado" lo que significa una vista con todo sus hojas de estilo y controladores
        .state('landingPage',{
            url: "/",
            templateUrl: "./components/landing/landing.view.html",
            css: "./styles/landing.style.css",
            resolve: {
		    	load: ['$ocLazyLoad', ($ocLazyLoad) => {
		    		return $ocLazyLoad.load('./components/landing/landing.controller.js')
                }]
            }
        })

        .state('users',{
            url: "/users",
            templateUrl: "./components/user/user.view.html",
            css: "./styles/landing.style.css",
            resolve: {
		    	load: ['$ocLazyLoad', ($ocLazyLoad) => {
		    		return $ocLazyLoad.load('./components/user/user.controller.js')
                }]
            }
        })

        .state('pets',{
            url: "/pets",
            templateUrl: "./components/pets/pet.view.html",
            css: "./styles/landing.style.css",
            resolve: {
		    	load: ['$ocLazyLoad', ($ocLazyLoad) => {
		    		return $ocLazyLoad.load('./components/pets/pet.controller.js')
                }]
            }
        })


        //- Se establece una ruta por defecto
        $urlRouterProvider.otherwise('/');
    }
})();