package root

type User struct {
	Id       string `json:"id"`
	Type     string `json:"type"`
	Username string `json:"username"`
	Password string `json:"password"`
	FullName string `json:"fullName"`
	Email    string `json:"email"`
	Website  string `json:"website"`
	Bio      string `json:"bio"`
}

type UserService interface {
	CreateUser(u *User) error
	GetByUsername(username string) (*User, error)
}
