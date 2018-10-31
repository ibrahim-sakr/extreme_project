package server

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"github.com/gorilla/mux"
	"extreme_auth/pkg"
	"extreme_auth/pkg/mongo"
	"github.com/dgrijalva/jwt-go"
	"fmt"
)

type userRouter struct {
	userService *mongo.UserService
}

func NewUserRouter(u *mongo.UserService, router *mux.Router) *mux.Router {
	userRouter := userRouter{u}

	router.HandleFunc("/user", userRouter.listUserHandler).Methods("GET")
	router.HandleFunc("/user", userRouter.createUserHandler).Methods("POST")
	router.HandleFunc("/user/{userId}", userRouter.getUserHandler).Methods("GET")
	router.HandleFunc("/user/{userId}", userRouter.updateUserHandler).Methods("PUT")
	router.HandleFunc("/user/{userId}", userRouter.deleteUserHandler).Methods("DELETE")
	router.HandleFunc("/token", userRouter.generateToken).Methods("POST")
	router.HandleFunc("/verify", userRouter.verifyToken).Methods("POST")
	return router
}

func (ur *userRouter) generateToken(w http.ResponseWriter, r *http.Request) {
	var secretKey = []byte("verySecret_$tring")
	err, credentials := decodeCredentials(r)

	if err != nil {
		Error(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	// select the user from DB where username
	err, userObject := ur.userService.Login(credentials)

	if err == nil {
		// generate jwt token and sign it with secret key
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"user": userObject,
		})

		tokenString, err := token.SignedString(secretKey)

		if err != nil {
			Error(w, http.StatusInternalServerError, "Incorrect Username or Password from")
			return
		}

		payload := struct {
			Token string
			User  root.User
		}{
			tokenString,
			userObject,
		}

		// save it in redis
		// return it
		Json(w, http.StatusOK, payload)
	} else {
		Error(w, http.StatusInternalServerError, "Incorrect Username or Password")
	}
}

func (ur *userRouter) verifyToken(w http.ResponseWriter, r *http.Request) {
	var secretKey = []byte("verySecret_$tring")
	err, token := decodeToken(r)

	tokenObject, err := jwt.Parse(token.Token, func(token *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})

	if claims, ok := tokenObject.Claims.(jwt.MapClaims); ok && tokenObject.Valid {
		Json(w, http.StatusOK, claims)
	} else {
		fmt.Println(err)
	}
}

func (ur *userRouter) deleteUserHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	log.Println(vars)
	userId := vars["userId"]

	err := ur.userService.Delete(userId)
	if err != nil {
		Error(w, http.StatusNotFound, err.Error())
		return
	}

	Json(w, http.StatusOK, err)
}

func (ur *userRouter) listUserHandler(w http.ResponseWriter, r *http.Request) {
	users, err := ur.userService.List()
	if err != nil {
		Error(w, http.StatusNotFound, err.Error())
		return
	}

	Json(w, http.StatusOK, users)
}

func (ur *userRouter) updateUserHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	log.Println(vars)
	userId := vars["userId"]

	user, err := decodeUser(r)

	if err != nil {
		Error(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	err = ur.userService.Update(userId, &user)

	if err != nil {
		Error(w, http.StatusInternalServerError, err.Error())
		return
	}

	Json(w, http.StatusOK, err)
}

func (ur *userRouter) createUserHandler(w http.ResponseWriter, r *http.Request) {
	user, err := decodeUser(r)
	if err != nil {
		Error(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	err = ur.userService.Create(&user)
	if err != nil {
		Error(w, http.StatusInternalServerError, err.Error())
		return
	}

	Json(w, http.StatusOK, err)
}

func (ur *userRouter) getUserHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	log.Println(vars)
	userId := vars["userId"]

	fmt.Printf(userId)

	user, err := ur.userService.Find(userId)
	if err != nil {
		Error(w, http.StatusNotFound, err.Error())
		return
	}

	Json(w, http.StatusOK, user)
}

func decodeUser(ur *http.Request) (root.User, error) {
	var u root.User
	if ur.Body == nil {
		return u, errors.New("no request body")
	}
	decoder := json.NewDecoder(ur.Body)
	err := decoder.Decode(&u)
	return u, err
}

func decodeCredentials(r *http.Request) (error, root.Credentials) {
	var c root.Credentials
	if r.Body == nil {
		return errors.New("no request body"), c
	}
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&c)
	return err, c
}

func decodeToken(r *http.Request) (error, root.Token) {
	var c root.Token
	if r.Body == nil {
		return errors.New("no request body"), c
	}
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&c)
	return err, c
}
