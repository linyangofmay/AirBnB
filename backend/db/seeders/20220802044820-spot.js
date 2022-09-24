'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '120 Disney Lanee',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.764535945,
        lng: -172.4730328,
        name: "Stripe",
        description: "The Sweet Retreat is perfectly located in the heart of the Sierra Mountains. This modern mountain house resides in the small town of Sugar Pine, Ca ( Between Twain Harte & Me Wuk Village ). 8 miles to Black Oak Casino and 16 miles from Pinecrest Lake and Dodge Ridge Ski Resort. Escape from the daily grind and retreat to this peaceful place. ",
        price: 7800,
        imageurl:"https://images.unsplash.com/photo-1631528858266-5ebeb8bfc6f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1260&q=80",
      },
      {
        ownerId: 2,
        address: '125 Disney Lanee',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.7645359,
        lng: -122.4730328,
        name: "Apple",
        description: "The Sweet Retreat is perfectly located in the heart of the Sierra Mountains. This modern mountain house resides in the small town of Sugar Pine, Ca ( Between Twain Harte & Me Wuk Village ). 8 miles to Black Oak Casino and 16 miles from Pinecrest Lake and Dodge Ridge Ski Resort. Escape from the daily grind and retreat to this peaceful place. ",
        price: 780,
        imageurl:"https://images.unsplash.com/photo-1616038242814-a6eac7845d88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",

      },
      {
        ownerId: 3,
        address: '126 Disney Lanee',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.764535978,
        lng: -122.4730328987,
        name: "GOOGLE",
        description: "AThe Sweet Retreat is perfectly located in the heart of the Sierra Mountains. This modern mountain house resides in the small town of Sugar Pine, Ca ( Between Twain Harte & Me Wuk Village ). 8 miles to Black Oak Casino and 16 miles from Pinecrest Lake and Dodge Ridge Ski Resort. Escape from the daily grind and retreat to this peaceful place. ",
        price: 500,
        imageurl: "https://images.unsplash.com/photo-1601585837217-3148ff17cd0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      },
      {
        ownerId: 4,
        address: '127 Disney Lanee',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.764535945,
        lng: -122.4730328345,
        name: "Claudia",
        description: "The Sweet Retreat is perfectly located in the heart of the Sierra Mountains. This modern mountain house resides in the small town of Sugar Pine, Ca ( Between Twain Harte & Me Wuk Village ). 8 miles to Black Oak Casino and 16 miles from Pinecrest Lake and Dodge Ridge Ski Resort. Escape from the daily grind and retreat to this peaceful place. ",
        price: 1250,
        imageurl:"https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      },
      {
        ownerId: 5,
        address: '129 Disney Lanee',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 67.764535,
        lng: -155.49876,
        name: "Abify",
        description: "The Sweet Retreat is perfectly located in the heart of the Sierra Mountains. This modern mountain house resides in the small town of Sugar Pine, Ca ( Between Twain Harte & Me Wuk Village ). 8 miles to Black Oak Casino and 16 miles from Pinecrest Lake and Dodge Ridge Ski Resort. Escape from the daily grind and retreat to this peaceful place. ",
        price: 1250,
        imageurl:"https://images.unsplash.com/photo-1520446396645-d72d96708bcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      },
      {
        ownerId: 1,
        address: '568 Italian Lanee',
        city: 'Milan',
        state: 'Milane',
        country: 'Italy',
        lat: 80.764535,
        lng: -60.49876,
        name: "Italian House",
        description: "The Sweet Retreat is perfectly located in the heart of the Sierra Mountains. This modern mountain house resides in the small town of Sugar Pine, Ca ( Between Twain Harte & Me Wuk Village ). 8 miles to Black Oak Casino and 16 miles from Pinecrest Lake and Dodge Ridge Ski Resort. Escape from the daily grind and retreat to this peaceful place. ",
        price: 1250,
        imageurl:"https://images.unsplash.com/photo-1543429853-e028e42251c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      },

      {
        ownerId: 2,
        address: '576 Italian Lanee',
        city: 'Milan',
        state: 'Milane',
        country: 'Italy',
        lat: 90.764535,
        lng: -70.49876,
        name: "Water House",
        description: "The Sweet Retreat is perfectly located in the heart of the Sierra Mountains. This modern mountain house resides in the small town of Sugar Pine, Ca ( Between Twain Harte & Me Wuk Village ). 8 miles to Black Oak Casino and 16 miles from Pinecrest Lake and Dodge Ridge Ski Resort. Escape from the daily grind and retreat to this peaceful place. ",
        price: 2500,
        imageurl:"https://images.unsplash.com/photo-1514890547357-a9ee288728e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dmVuaWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      },
      {
        ownerId: 3,
        address: '589 Italian Lanee',
        city: 'Milan',
        state: 'Milane',
        country: 'Italy',
        lat: 90.764535,
        lng: -70.49876,
        name: "Water House",
        description: "The Sweet Retreat is perfectly located in the heart of the Sierra Mountains. This modern mountain house resides in the small town of Sugar Pine, Ca ( Between Twain Harte & Me Wuk Village ). 8 miles to Black Oak Casino and 16 miles from Pinecrest Lake and Dodge Ridge Ski Resort. Escape from the daily grind and retreat to this peaceful place. ",
        price: 2500,
        imageurl:"https://images.unsplash.com/photo-1506807520672-c4a8d5bbe260?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      },
      
      {
        ownerId: 5,
        address: '580 Italian Lanee',
        city: 'Milan',
        state: 'Milane',
        country: 'Italy',
        lat: 90.764535,
        lng: -70.49876,
        name: "Water House",
        description: "The Sweet Retreat is perfectly located in the heart of the Sierra Mountains. This modern mountain house resides in the small town of Sugar Pine, Ca ( Between Twain Harte & Me Wuk Village ). 8 miles to Black Oak Casino and 16 miles from Pinecrest Lake and Dodge Ridge Ski Resort. Escape from the daily grind and retreat to this peaceful place. ",
        price: 2500,
        imageurl:"https://images.unsplash.com/photo-1624184780131-189b96898b84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      },
      {
        ownerId: 1,
        address: '600 French Lanee',
        city: 'Marseille',
        state: 'South State',
        country: 'France',
        lat: 30.764535,
        lng: -60.49876,
        name: "Cute street house",
        description: "The Sweet Retreat is perfectly located in the heart of the Sierra Mountains. This modern mountain house resides in the small town of Sugar Pine, Ca ( Between Twain Harte & Me Wuk Village ). 8 miles to Black Oak Casino and 16 miles from Pinecrest Lake and Dodge Ridge Ski Resort. Escape from the daily grind and retreat to this peaceful place. ",
        price:700,
        imageurl:"https://images.unsplash.com/photo-1593264286097-bf76a0717ff4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1878&q=80",
      },
      {
        ownerId: 2,
        address: '580 Italian Lanee',
        city: 'Milan',
        state: 'Milane',
        country: 'Italy',
        lat: 90.764535,
        lng: -70.49876,
        name: "Water House",
        description: "The Sweet Retreat is perfectly located in the heart of the Sierra Mountains. This modern mountain house resides in the small town of Sugar Pine, Ca ( Between Twain Harte & Me Wuk Village ). 8 miles to Black Oak Casino and 16 miles from Pinecrest Lake and Dodge Ridge Ski Resort. Escape from the daily grind and retreat to this peaceful place. ",
        price: 2500,
        imageurl:"https://images.unsplash.com/photo-1514890547357-a9ee288728e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dmVuaWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      },



    ], {});
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Spots', null, {});

  }
};
