package mongo

import (
	"gopkg.in/mgo.v2/bson"
	"gopkg.in/mgo.v2"
	"extreme_auth/pkg"
)

type userModel struct {
	Id       bson.ObjectId `bson:"_id,omitempty"`
	Type     string
	Username string
	Password string
	FullName string
	Email    string
	Website  string
	Bio      string
}

func userModelIndex() mgo.Index {
	return mgo.Index{
		Key:        []string{"username", "email"},
		Unique:     true,
		DropDups:   true,
		Background: true,
		Sparse:     true,
	}
}

func newUserModel(u *root.User) *userModel {
	return &userModel{
		Type:     u.Type,
		Username: u.Username,
		Password: u.Password,
		FullName: u.FullName,
		Email:    u.Email,
		Website:  u.Website,
		Bio:      u.Bio,
	}
}

func (u *userModel) toRootUser() *root.User {
	return &root.User{
		Id:       u.Id.Hex(),
		Type:     u.Type,
		Username: u.Username,
		Password: u.Password,
		FullName: u.FullName,
		Email:    u.Email,
		Website:  u.Website,
		Bio:      u.Bio,
	}
}
