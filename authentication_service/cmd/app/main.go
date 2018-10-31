package main

import (
	"extreme_auth/pkg/crypto"
	"extreme_auth/pkg/mongo"
	"extreme_auth/pkg/server"
	"log"
)

func main() {
	mongoDBService, err := mongo.NewSession("mongo:27017")
	if err != nil {
		log.Fatalln("unable to connect to mongodb")
	}

	defer mongoDBService.Close()

	hash := crypto.Hash{}
	userService := mongo.NewUserService(mongoDBService.Copy(), "authentication", "user", &hash)
	serverInstance := server.NewServer(userService)

	serverInstance.Start()
}
