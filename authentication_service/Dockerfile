FROM golang:1.11.1

WORKDIR /go/src/extreme_auth

COPY . .

RUN go get -d -v ./...

RUN go install -v ./...

CMD ["../../bin/app"]
