

var albumAttrs = {performer: "Paulo Fernandes", title: "The nice test", cost: 10.99 };

  describe("POST /albums", function(){
    it ("should create a new album", function(done){
      chai.request(app)
        .post('/albums')
        .set('authorization', authorization)
        .send(albumAttrs)
        .end((err, res) => {
          expect(res.body.data).to.equal({performer: "Paulo Fernandes", title: "The nice test", cost: 10.99 });
          done();
        });
    }); 

  describe("POST /login", function(){
    it ("should return an authorization header", function(done){
      chai.request(app)
        .post('/login')
        .send(userAttrs)
        .end((err, res) => {
          expect(res.status).to.equal(204);
          expect(res.body.data).to.equal(undefined);
          expect(res.headers['authorization']).to.not.equal(undefined);
          authorization = res.headers['authorization'];
          done();
        });
    });      
  });
  
  describe("POST /logout", function(){
    it ("should remove the authorization header", function(done){
      chai.request(app)
        .post('/logout')
        .set('authorization', authorization)
        .end((err, res) => {
          expect(res.status).to.equal(204);
          expect(res.body.data).to.equal(undefined);
          expect(res.headers['authorization']).to.equal(undefined);
          done();
        });
    });      
  });
});