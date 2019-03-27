# General Assembly Project 3 : A Full-Stack RESTful MERN Application

#### Project Members:
- [James Benson](https://github.com/jjbenson85)
- [Begona Fernandez](https://github.com/aguairon)
- [Siddant Gurung](https://github.com/Siddant)

#### Timeframe:
7 days

## Technologies used
* React.js
* Node.js
* JavaScript (ES6) / HTML5 / SCSS
* Git / GitHub
* MongoDB & Mongoose
* BCrypt & Session Auth
* Bulma CSS Framework & SCSS
* Chai/Mocha/Supertest
* Bluebird
* Request-Promise/Axios

## External APIs
* Npms.io
* Filestack

## Installation
1. Clone or download the repo
1. ```Yarn``` to install packages
1. ```Yarn run build```
1. ```Yarn run start```
1. Open your local host on port 4000

### Our Application: Pepino - Built for developers
![Pepino](https://user-images.githubusercontent.com/34242042/55018285-6790df80-4fea-11e9-8092-bbe075a9da85.png)

You can find a hosted version here ----> [Live: Pepino](https://pepino-wdi.herokuapp.com/)


### Project overview
Pepino is the result of 7 day group project on the Web Development Immersive course at General Assembly.

Developers can use Pepino to discover new JavaScript packages. They can search using add these packages to a collection or Project. They can then view other Users and Users'  Projects. There is also the ability to comment on the Projects and Packages.

The brief was to create a full-stack RESTful MERN application. That is one which uses MongoDB for its database, Express as its web framework, React to display content and Node.js to run on.

### Instructions

1. Register to become a user by entering your Username, Email address and Password.
  ![Pepino](https://user-images.githubusercontent.com/34242042/55020557-facc1400-4fee-11e9-9f47-255a56650fe1.png)

2. Once registered, sign in.
  ![Pepino](https://user-images.githubusercontent.com/34242042/55020559-fdc70480-4fee-11e9-8bba-b42186dd28de.png)

3. You will be directed to your profile page.
  - Here you can edit your details by clicking edit profile.
  - View existing Projects
  - Create a new project

4. Click ```Add project``` and Enter the name of the project and description.
  ![Pepino](https://user-images.githubusercontent.com/34242042/55020584-07506c80-4fef-11e9-85fb-060ec94d807b.png)

5.   There are three project tabs on the left hand side of the screen.
  1. Search: Use the search bar to search for a package and click ```Add to project```.
  ![Pepino](https://user-images.githubusercontent.com/34242042/55021663-189a7880-4ff1-11e9-9562-7f9d1c496ec5.png)

  2. Installed: You can view the currently installed packages.
  ![Pepino](https://user-images.githubusercontent.com/34242042/55021662-189a7880-4ff1-11e9-8cbe-546dec7cc3fd.png)

  3. Comments: See the comments on this project.
  ![Pepino](https://user-images.githubusercontent.com/34242042/55021661-189a7880-4ff1-11e9-9fd8-a2d75733f2bb.png)

6. Use the search bar to search for a package and click ```Add to project```.
  ![Pepino](https://user-images.githubusercontent.com/34242042/55020607-10d9d480-4fef-11e9-810d-565bff00d895.png)

7. Click ```View Details``` to learn more about the package.
  There are three package tabs on the right hand side of the screen.
  1. About
  ![Pepino](https://user-images.githubusercontent.com/34242042/55021092-171c8080-4ff0-11e9-90b3-22a28ccce35c.png)

  2. Stats
  ![Pepino](https://user-images.githubusercontent.com/34242042/55021091-171c8080-4ff0-11e9-86ed-fec1294f0bb8.png)

  3. Comments
  ![Pepino](https://user-images.githubusercontent.com/34242042/55021089-171c8080-4ff0-11e9-8d77-f248fc87e8d8.png)

8. At the top of the page, click on the Discover Users button, and enter a search term to filter Users.
    ![Pepino](https://user-images.githubusercontent.com/34242042/55024898-b729d800-4ff7-11e9-8951-431d4b25f648.png)

9.  At the top of the page, click on the Discover Projects button, and enter a search term to filter Projects.
![Pepino](https://user-images.githubusercontent.com/34242042/55025062-0d971680-4ff8-11e9-98f9-7fff316467da.png)






## Process
#### Ideation
We started this project by identifying areas that we were interested in. As we were all JavaScript developers, a project about JavaScript seemed natural!

We decided upon a Package search and discovery tool with some social media aspects.

#### Experimentation
There are a few Node package search APIs, but I settled on the Npms API as it seemed the easiest to use and had some interesting meta-data.

We tested the API using Insomnia. Here we query Npms for any packages that include the term 'webpack'.
![Pepino](https://user-images.githubusercontent.com/34242042/55031595-d1b77d80-5006-11e9-8798-6e9c59743aa5.png)


#### Design
###### Back-end
We decided what Models we would need for out backend and how they relate to one another.


###### Front-end
We created wireframes on Paper. The design is inspired by the layout of Insomnia.

I created a mockup in using HTML, CSS And [Bulma](https://bulma.io/).
![Pepino Mockup](https://user-images.githubusercontent.com/34242042/55034039-6f617b80-500c-11e9-9e19-a642d9fd78db.png)






#### Division of labour
The project split neatly into three:
1. Users
2. Projects
3. Packages

We each took ownership of one of these aspects and created the Models, Controllers, Routes and Testing on the backend and the React components for the front end.

This division of labour meant we were each able to experience every part of the project from back to front, and also meant we could make changes without stepping on anyone else's toes.

<!-- ##### Users - Siddant
Each User has the following fields
- username
- email
- password
- Image
- bio
- projects (virtual)
- passwordConfirmation (virtual)

##### Projects - Begona
Each Project has the following fields
- name
- description
- user
- required
- packages
- visible
- comments (embedded)
  - user
  - text
  - timestamps

##### Packages - James
  Each Package has the following fields
- name
- description
- icon
- version
- keywords
- downloadsCount
- score
- comments (embedded)
  - user
  - text
  - timestamps
- npms -->
#### Teamworking
We had daily stand ups where we would state our progress and any blockers. We would then have another meeting before lunch and another meeting at the end of the day.

As we were working on our first group project where there was the chance for Git conflicts, we were all very careful to communicate when and what we were committing. When there were conflicts we would go through them together to resolve them and we had very few issues.


<!-- #### Styling
We used Bulmas basic styling through the majority of the development of th Pepino, and only at the end did we style it properly. Due to the way Bulma works with SCSS and has variables that are easy to manipulate I was able to change our brand colours.

To add the Skew effect I added a class of skew to eveything that needed to be skewed and created a SCSS rule.

```
.is-skew,
label.is-skew,
input.is-skew,
button.is-skew,
.tag
{
  transform: skew(-10deg);
  border-radius: $border-radius;
}

label.label.is-skew{
  background: $primary;
  color: white;
  padding-left: 8px;
}

a.navbar-item.is-skew,
.navbar.link-list.is-skew{
  font-weight: 700;
  border-radius: 0px;
  border-left: 1px solid $grey;
  &:last-child{
    border-right: 1px solid $grey;
  }
}
``` -->







## Challenges

#### Communication
The biggest challenge of this project was of communication. I had found that I did not like to be disturbed whilst working as it would break my concentration and flow. Siddant however liked to stay in constant contact so that he knew what was going on.

We discussed this conflict and came up with the solution of having scheduled meetings throughout the day, on the understanding that we were not to disturb each other unless we had a question or problem that needed solving.

This worked really well and I'm glad we had the discussion about the problem rather than power through and ignore it.

#### Adding Comments to Packages
An interesting technical challenge for me was that to have comments enabled for the Packages we would need to keep a model of the package in our database to store our comments data, but the Package data was coming from an external APIs

To solve this, we do a search using Npms and depending on wether the package is in our database, we either create an entry based on the new package, or return the package we have stored.

```
//Request-promise AJAX request
rp(options)

  //Data from response
  .then( (data) =>{

    //Promise from bluebird returns when each promise from the data.results array is fulfilled
    return Promise.map(data.results, data => {

      const {name, description, version, links, keywords, author} = data.package
      const score = data.score.final

      return Package
        .findOne({name})
        .then( foundPackage => {

          //If the package does not exist in the DB
          if(!foundPackage){

            //Create an object from the Npms data
            const packageDetails = {
              name, description, version, links, keywords, author, score,
              comments: []
            }

            //Add a new project to database and return it
            return Package.create(packageDetails)

          }else{
            //If it does exist in DB, return it
            return foundPackage
          }
        })

        .then((_package) => {
          //Replace all the data in the Npms field with that from Npms
          _package.npms = data.package

          //Return the package
          return _package
        })
    })
  })

  //Return result of Promise.map
  .then( (output) => {
    res.json(output)
  })
```

This does work, but could be improved. One of the problems is that it if we have the package stored, it does not get updated from Npms. This partly negated by including all the Npms data in the Npms field of the Package.

## Wins

#### Styling

I think the styling of this site was an absolute win!

We used Bulmas basic styling through the majority of the development of Pepino, and only at the end did we style it properly. Due to the way Bulma works with SCSS and has variables that are easy to manipulate I was able to change our brand colours.

To add the Skew effect I added a class of skew to everything that needed to be skewed and created a SCSS rule.

```
.is-skew,
label.is-skew,
input.is-skew,
button.is-skew,
.tag
{
  transform: skew(-10deg);
  border-radius: $border-radius;
}

label.label.is-skew{
  background: $primary;
  color: white;
  padding-left: 8px;
}

a.navbar-item.is-skew,
.navbar.link-list.is-skew{
  font-weight: 700;
  border-radius: 0px;
  border-left: 1px solid $grey;
  &:last-child{
    border-right: 1px solid $grey;
  }
}
```

The colour scheme was inspired by a pair of trainers I own!

![Nike Air Stab Trainers](https://user-images.githubusercontent.com/34242042/55031251-1b539880-5006-11e9-8ee6-cd43326f225f.jpg)


The Skew effect was inspired by a toggle switch from this [code pen](https://codepen.io/mallendeo/pen/eLIiG), (which we did not use!)

![Toggles](https://user-images.githubusercontent.com/34242042/55031105-b9932e80-5005-11e9-8589-5fa85fb3d33a.png)

#### Testing


Another win was the Testing coverage. Part of the brief was that we had to have 100% coverage for at least one of our routes, which we achieved. After the completion of the project I created some more tests just to see how much coverage we could attain and got it up to 97.75%

Our testing setup used Mocha and Chai with Supertest and NYC to display our coverage.

![Pepino Testing](https://user-images.githubusercontent.com/34242042/55033927-2c070d00-500c-11e9-8626-63b4743a6c72.png)

Though we created tests, the project was not built using Test Driven Development practices. However it was still good practice to use these tools.

## Future features

#### Package Suggestions
Npms is able to take multiple terms and return suggestions. I would like to incorporate this feature, using the installed packages from the project to make suggestions to the user.

Here is an Insomnia request to Npms suggestions with the terms 'webpack' and 'bluebird'
![Npms Suggestions](https://user-images.githubusercontent.com/34242042/55031842-6e7a1b00-5007-11e9-9c96-80695b84304f.png)

#### Package.json integration
I would like to be able to export the selected packages as a terminal command so the packages could be imported into your actual project.

It would also be possible to read a package.json and populate your Project with Packages.


#### Search for users based on experience with a Packages
I think it could be really useful to be able to search your contacts for someone that has used a technology that you wish to use. They could then offer help and guidance on the tech.
