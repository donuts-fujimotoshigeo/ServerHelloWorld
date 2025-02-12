package main

import (
  "fmt"
  "net/http"
  "log"

  "github.com/julienschmidt/httprouter"
)

func rootHandler(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	fmt.Fprintf(w, "Hello, World")
}

func helloName(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
    fmt.Fprintf(w, "Hello, %s!\n", ps.ByName("name"))
}

func main() {
    router := httprouter.New()
    router.GET("/", rootHandler)
    router.GET("/hello/:name", helloName)

    log.Fatal(http.ListenAndServe(":8080", router))
}