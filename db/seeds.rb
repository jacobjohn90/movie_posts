Comment.destroy_all
Movie.destroy_all
User.destroy_all

users = User.create!([
    {
        email: 'test@tester.com',
        password: 'testtest',
        password_confirmation: 'testtest'
    },
    {
        email: 'jacob@john.com',
        password: 'testtest',
        password_confirmation: 'testtest'
    },
    {
        email: 'example@example.com',
        password: 'testtest',
        password_confirmation: 'testtest'
    }

])

movies = Movie.create!([
    {
        title: 'Test',
        mpaa_rating: 'G',
        img: 'www.google.com',
        summary: 'asd;faj; foaejf;aosfjva;osjva;sja;ffjas;ofijas;foiasj ;aosijf a;soifjas;vja s;vja s;oivaj sd;ofiaj sdf;oiaj f;'

    },
        {
        title: 'Best Movie',
        mpaa_rating: 'R',
        img: 'www.google.com',
        summary: 'asd;faj; foaejf;aosfjva;osjva;sja;ffjas;ofijas;foiasj ;aosijf a;soifjas;vja s;vja s;oivaj sd;ofiaj sdf;oiaj f;'

    }
])

Comment.create!(user_id: users[0].id, movie_id: movies[0].id, :content=>'this movie was great!')
Comment.create!(user_id: users[0].id, movie_id: movies[1].id, :content=>'meh')

Comment.create!(user_id: users[1].id, movie_id: movies[0].id, :content=>'it was okay')
Comment.create!(user_id: users[1].id, movie_id: movies[1].id, :content=>'this movie was great!')

Comment.create!(user_id: users[2].id, movie_id: movies[0].id, :content=>'wow, amazing!')
Comment.create!(user_id: users[2].id, movie_id: movies[1].id, :content=>'save your money')
