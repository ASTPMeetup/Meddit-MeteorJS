/**
 * Created by Piero on 7/7/2017.
 */
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import { Posts } from '../lib/collections/posts.js';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { sinon } from 'meteor/practicalmeteor:sinon';


if(Meteor.isServer) {
    describe('Posts', () => {
        describe('Testing all post methods', () => {
            const fakeId = Random.id();
            let currentUser;

            beforeEach(() => {
                resetDatabase();

                Factory.define('user', Meteor.users, {
                    emails: [{
                        "address": "foo@gmail.com",
                        "vertified": false
                    }],
                    profile: {
                        name: 'Billy Madison'
                    }
                });

                currentUser = Factory.create('user');
                sinon.stub(Meteor, 'user');
                Meteor.user.returns(currentUser);

                postTest1 = Posts.insert({
                    title: 'Test post Mocha',
                    author: 'Bob',
                    userId: Random.id(),
                    url: 'http://google.com/?q=test-10',
                    submitted: new Date(),
                    commentsCount: 0,
                    upvoters: [],
                    votes: 0
                });

                postTest2 = Posts.insert({
                    title: 'Test post Mocha 2',
                    url: 'http://google.com/?q=test-10',
                    submitted: new Date(),
                    commentsCount: 0,
                    upvoters: [],
                    votes: 0
                });
            });

            afterEach(() => {
                Meteor.user.restore();
                resetDatabase();
            });

            it('postRemove method should delete post', () => {
                const deletePost = Meteor.server.method_handlers['postRemove'];
                let postCount = Posts.find().count();

                postToDelete = Posts.findOne(postTest1);
                postToDelete2 = Posts.findOne(postTest2);

                deletePost.apply(postToDelete, [postTest1]);
                deletePost.apply(postToDelete2, [postTest2]);

                assert.strictEqual(Posts.find().count(), postCount - 2);
            });

            it('postInsert method should insert posts', () => {
                const insertPost = Meteor.server.method_handlers['postInsert'];
                let postCountTwo = Posts.find().count();

                let postTest3 = {
                    title: 'Test post Mocha 3',
                    url: 'http://google.com/?q=test-11'
                };

                let postTest4 = {
                    title: 'Test post Mocha 4',
                    url: 'http://google.com/?q=test-14'
                };

                const invocation = {fakeId};

                insertPost.apply(invocation, [postTest3]);
                insertPost.apply(invocation, [postTest4]);

                assert.strictEqual(Posts.find().count(), postCountTwo + 2);
            });

            it('upvote method should increment post upvotes', () => {
                const upvotePost = Meteor.server.method_handlers['upvote'];

                let pst1Votes = Posts.findOne(postTest1).votes;
                let pst2Votes = Posts.findOne(postTest2).votes;

                const invocation = {fakeId};

                upvotePost.apply(invocation, [postTest1]);
                upvotePost.apply(invocation, [postTest2]);
                upvotePost.apply(invocation, [postTest2]);

                assert.strictEqual(Posts.findOne(postTest1).votes, pst1Votes + 1);
                assert.strictEqual(Posts.findOne(postTest2).votes, pst2Votes + 2);
            });
        });
    })
}