Comment.destroy_all
Movie.destroy_all
User.destroy_all

users = User.create!([
    {
        email: 'test@tester.com',
        password: 'testtest',
        password_confirmation: 'testtest',
        username: 'tester',
        image: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
    },
    {
        email: 'jacob@john.com',
        password: 'testtest',
        password_confirmation: 'testtest',
        username: 'jacobjohn',
        image: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
    },
    {
        email: 'example@example.com',
        password: 'testtest',
        password_confirmation: 'testtest',
        username: 'exampleuser',
        image: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
    }

])

movies = Movie.create!([
    {
        title: 'Frozen',
        mpaa_rating: 'PG',
        img: "https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_SX300.jpg",
        summary: "Anna, a fearless optimist, sets off on an epic journey - teaming up with rugged mountain man Kristoff and his loyal reindeer Sven - to find her sister Elsa, whose icy powers have trapped the kingdom of Arendelle in eternal winter. Encountering Everest-like conditions, mystical trolls and a hilarious snowman named Olaf, Anna and Kristoff battle the elements in a race to save the kingdom. From the outside Anna's sister, Elsa looks poised, regal and reserved, but in reality, she lives in fear as she wrestles with a mighty secret-she was born with the power to create ice and snow. It's a beautiful ability, but also extremely dangerous. Haunted by the moment her magic nearly killed her younger sister Anna, Elsa has isolated herself, spending every waking minute trying to suppress her growing powers. Her mounting emotions trigger the magic, accidentally setting off an eternal winter that she can't stop. She fears she's becoming a monster and that no one, not even her sister, can help her.",
        actor: "Kristen Bell, Idina Menzel, Jonathan Groff, Josh Gad",
        director: "Chris Buck, Jennifer Lee",
        rating: 7.5,
        year: 2013

    },
        {
        title: 'The Lion King',
        mpaa_rating: 'G',
        img: "https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SX300.jpg",
        summary: "A young lion Prince is cast out of his pride by his cruel uncle, who claims he killed his father. While the uncle rules with an iron paw, the prince grows up beyond the Savannah, living by a philosophy: No worries for the rest of your days. But when his past comes to haunt him, the young Prince must decide his fate: will he remain an outcast, or face his demons and become what he needs to be?",
        actor: 'Rowan Atkinson, Matthew Broderick, Niketa Calame-Harris, Jim Cummings',
        director: 'Roger Allers, Rob Minkoff',
        rating: 8.5,
        year: 1994

    }
])

Comment.create!(user_id: users[0].id, movie_id: movies[0].id, :content=>'this movie was great!')
Comment.create!(user_id: users[0].id, movie_id: movies[1].id, :content=>'meh')

Comment.create!(user_id: users[1].id, movie_id: movies[0].id, :content=>'it was okay')
Comment.create!(user_id: users[1].id, movie_id: movies[1].id, :content=>'this movie was great!')

Comment.create!(user_id: users[2].id, movie_id: movies[0].id, :content=>'wow, amazing!')
Comment.create!(user_id: users[2].id, movie_id: movies[1].id, :content=>'save your money')
