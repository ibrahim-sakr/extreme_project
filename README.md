# Extreme Project

## Overview

small microservices archeticture for adding users as doctors or patients then assign appointments

## Install

make sure you have docker compose installed on your machine

and just clone the repo

```
git clone git@github.com:ibrahim-sakr/extreme_project.git
```

finally run
```
docker-compose up
```

## Run

import Postman Collection and Env
then start sending requests

## Services FLOW

![alt text](https://github.com/ibrahim-sakr/extreme_project/blob/master/assets/services.png "Microservices Architecture")

## API FLOW

- doctor/patient Register
- doctor/patient Login
- doctor adds his appointments
- patien list all available appointments for a doctor
- patient take an appointment
- doctor update, delete his appointments
- patient remove his appointments (not delete)
