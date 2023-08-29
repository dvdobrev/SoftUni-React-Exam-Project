/* eslint-disable max-len */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// exports.deleteInactiveUsers = functions.pubsub.schedule("every 24 hours").timeZone("Europe/Berlin").onRun(async (context) => {
//   const inactiveDays = 3; // Define the number of inactive days
//   const now = Date.now();
//   console.log("now: ", now);

//   const inactiveTimestamp = now - inactiveDays * 24 * 60 * 60 * 1000;

//   const usersSnapshot = await admin.auth().listUsers();
//   const deletePromises = [];

//   usersSnapshot.users.forEach((user) => {
//     console.log("user registered: ", user.metadata.creationTime);
//     console.log("user singInTime: ", user.metadata.lastSignInTime);
//     if (user.metadata.lastSignInTime < inactiveTimestamp) {
//       deletePromises.push(admin.auth().deleteUser(user.uid));
//     }

//     if (user.metadata.creationTime < inactiveTimestamp) {
//       deletePromises.push(admin.auth().deleteUser(user.uid));
//     }
//   });

//   await Promise.all(deletePromises);

//   return null;
// });

exports.deleteInactiveUsers = functions.pubsub
    .schedule("every 24 hours")
    .timeZone("Europe/Berlin")
    .onRun(async (context) => {
      const cutoffDays = 1; // Number of days before cutoff
      const currentDate = new Date();
      const cutoffDate = new Date(currentDate);
      cutoffDate.setDate(currentDate.getDate() - cutoffDays);

      const usersSnapshot = await admin.auth().listUsers();

      const deletePromises = [];

      usersSnapshot.users.forEach((user) => {
        const creationTime = new Date(user.metadata.creationTime);
        console.log("User registered:", creationTime);

        if (creationTime < cutoffDate) {
          deletePromises.push(admin.auth().deleteUser(user.uid).catch((error) => {
            console.error(`Error deleting user ${user.uid}:`, error);
          }));
        }
      });

      await Promise.all(deletePromises);

      return null;
    });


exports.deleteAllCollections = functions.pubsub
    .schedule("every 2 days")
    .timeZone("Europe/Berlin")
    .onRun(async (context) => {
      const firestore = admin.firestore();
      const collections = await firestore.listCollections();

      const deletePromises = [];

      collections.forEach((collection) => {
        deletePromises.push(collection.listDocuments().then((documents) => {
          documents.forEach((doc) => {
            doc.delete().catch((error) => {
              console.error(`Error deleting document ${doc.id} in collection ${collection.id}:`, error);
            });
          });
        }));
      });

      await Promise.all(deletePromises);

      return null;
    });

