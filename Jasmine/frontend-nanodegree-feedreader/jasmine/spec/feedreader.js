/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

      it('All object is defined with url',function(){
         allFeeds.forEach(function(feed){
               expect(feed.url).toBeDefined();
               expect(feed.url.length).not.toBe(0);
         });

      });



        it('All object name is defined and not empty',function(){
          allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
          });
        });


    });
  describe('The menu',function(){



      it('Menu element is hidden by default',function(){
         expect($('body').hasClass('menu-hidden')).toBe(true);
      });


    it('Menu changes visibility when clicked',function(){

           //First click
         $('.icon-list').click();
         //Expect there to be  no menu-hidden class
            expect($('body').hasClass('menu-hidden')).toBe(false);
            //second click
             $('.icon-list').click();
           //Expect that there is a menu-hidden class
              expect($('body').hasClass('menu-hidden')).toBe(true);

    });
  });
  describe('Inital Entries',function(){

         beforeEach(function(done){
             loadFeed(0,done);
         });


         it('Single Entry',function(done){

           var entry_length=$(".feed .entry").length;
            expect(entry_length).toBeGreaterThan(0);
                done();
            });



       describe('New Feed Selection',function(){
         var oldfeed;
         var newfeed;
         beforeEach(function(done){
           //Below are two synthronous requests, to test whether the feed
           // has been changed
             loadFeed(1,function(){
                oldfeed=$(".feed").html();
                loadFeed(2,function(){

                  newfeed=$(".feed").html();
                  done();

                });
             });

         });

           it('Changes',function(done){
             //We expect the oldfeed to be not t
           expect(oldfeed).not.toEqual(newfeed);
           done();
           });
       });
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */


  });
}());
