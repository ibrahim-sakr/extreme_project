package mongo

import (
	"gopkg.in/mgo.v2"
	"extreme_auth/pkg"
	"gopkg.in/mgo.v2/bson"
)

type UserService struct {
	collection *mgo.Collection
	hash       root.Hash
}

func NewUserService(session *Session, dbName string, collectionName string, hash root.Hash) *UserService {
	collection := session.GetCollection(dbName, collectionName)
	collection.EnsureIndex(userModelIndex())
	return &UserService{collection, hash}
}

func (p *UserService) Create(u *root.User) error {
	user := newUserModel(u)
	hashedPassword, err := p.hash.Generate(user.Password)
	if err != nil {
		return err
	}
	user.Password = hashedPassword
	return p.collection.Insert(&user)
}

func (p *UserService) Find(userId string) (*root.User, error) {
	model := userModel{}
	err := p.collection.FindId(bson.ObjectIdHex(userId)).One(&model)
	return model.toRootUser(), err
}

func (p *UserService) Login(c root.Credentials) (error, root.User) {
	model := userModel{}
	err := p.collection.Find(bson.M{"username": c.Username, "type": c.Type}).One(&model)

	err = p.hash.Compare(model.Password, c.Password)

	if err != nil {
		return err, root.User{}
	}

	return err, root.User{
		Id:       model.Id.Hex(),
		Type:     model.Type,
		Username: model.Username,
		Password: "-",
		FullName: model.FullName,
		Email:    model.Email,
		Website:  model.Website,
		Bio:      model.Bio,
	}
}

func (p *UserService) List() ([]userModel, error) {
	var models []userModel
	err := p.collection.Find(nil).All(&models)

	return models, err
}

func (p *UserService) Update(userId string, u *root.User) error {
	user := newUserModel(u)

	if user.Password != "" {
		hashedPassword, erro := p.hash.Generate(user.Password)

		if erro != nil {
			return erro
		}

		user.Password = hashedPassword
	}

	err := p.collection.UpdateId(bson.ObjectIdHex(userId), &user)

	return err
}

func (p *UserService) Delete(userId string) error {
	err := p.collection.RemoveId(bson.ObjectIdHex(userId))

	return err
}
