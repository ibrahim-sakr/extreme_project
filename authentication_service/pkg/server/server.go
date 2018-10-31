package server

import (
	"log"
	"net/http"
	"os"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"extreme_auth/pkg/mongo"
)

type Server struct {
	router *mux.Router
}

func NewServer(u *mongo.UserService) *Server {
	s := Server{router: mux.NewRouter()}
	NewUserRouter(u, s.newSubrouter("/api"))
	return &s
}

func (s *Server) Start() {
	log.Println("Listening on port 7070")
	if err := http.ListenAndServe(":7070", handlers.LoggingHandler(os.Stdout, s.router)); err != nil {
		log.Fatal("http.ListenAndServe: ", err)
	}
}

func (s *Server) newSubrouter(path string) *mux.Router {
	return s.router.PathPrefix(path).Subrouter()
}