importScripts('../../../../resources/js-test-pre.js');
importScripts('../../../resources/common.js');

description("Test decrypting using RSA-OAEP SHA-1 with an imported key and a label in workers");

jsTestIsAsync = true;

var extractable = false;
var cipherText = hexStringToUint8Array("346dc8f3a158e494004cf82c0843ab1c1e7a612263a1c44d941309175a3d2598997be651f2d3419f89923843ca344414d45989e886aaa79573d96d4f3f777af3b2e9fcd44b51c00a8e4395bf54ac89d88559c712d49853de448e190fad886c45fa0742f2ddf18e5f6155eb7f38348217efd67c14ef141e81f3b1c1804b3bb437ef1b23a25dadb594985c500181208c74cd2068cbfdccc02db7113ed5e72d7a3543a78ec9c2070715e409ab10687762358f786c669e592e467107a13caaaadc3c341facf249baf743a3b93c49f73ea5634052f1a6ee46265e02391dd2cbcd4a523bfee8321470279fff63b87a4a53465b4736fb31ee99e9b0379761f3e630f636");
var jwkKey = {
    kty: "RSA",
    alg: "RSA-OAEP",
    use: "enc",
    key_ops: ["decrypt", "unwrapKey"],
    ext: true,
    n: "lxHN0N9VRZ0_pl0xv3-NXx70WnjkODSkQ5LjHXTFy3DOQsvkagFzD9HqYQezCmcewLjdK5PLwSesDoMdfL6tusBHcvyit1kvydYFQ3NLbENNkYsiBG5_nW4IQGL6JKbZ5iGdUop98QHKm6YZR1u4zrAtxM6bVEo05VvhjRS0M8yWoZVi-7Vdsc0LqI0Qdq_NoctX5Fu-AqiBN7Uo1HkYGcP2oC82J_J5cjw98BQiP5kDWThq9RK-X6S-EUALx_m4iG6iOYKTA3SQyf1xBqFaXXoEJjcckbOqkegecz5b-YWUh8iZPvhwnt-RZwpIbLJgKwz19ndkn9KvoEEw7YbEow",
    e: "AQAB",
    d: "cj5DkDakjM2bKduGWJREO-_zyEtuA1dD9doqKMd7IRuA0CDS7puEAS20-oXRDwfmyMXEdEUDrGGtCxh6fzDPvs_T-JA3GUK4EgHo3xZcrlXDXlKCeil6Fnr0gISZOIh5dkBrcdVL4quBJe4ZZc5mVuAC7Ld13et0TxMJ4iALGrPuqPVUOGSYIcZ9idx5zKKBWhY3tPggEdKpnHBmPfTRO4yZaf0Nw1QXrgSMZY9ejeuaurAh4Q8o4-6-r8O2LUe7ufMh_ccKkXISEh4KdOnT17EM9BQTn9UNS9GoK2ZZU0U3io5DSu_kpasr4uOVWcGlE2wczOv2nkGwG39F3sFF0Q",
    p: "x5vnco5j-TD6hTOzyN4DhkZ44m05NycxT6SUE2qTurT3-uze_L7TYutLRIRkovRMhTHZAr2pziRlasEs13PEz9Zvx1I_T68srsonrdbak-SFMecM7EjHc5C-J13gXhw9HIW28_Sx9rQ-JkGwEwE9PEdIUfuvdqpgh3SmXwPJrEs",
    q: "wb9vllg_2n-kNge0bThg_7xu1UwTzipM8vxSUkkV2IipJKIAekkU3aAB8LoPhUI0-17pSGw3ETOO27t163TI9qIPpzLbhTH9aUi7qLGbKlzPlgnqP43Z0LHxc3xKDgit-Ar29QLaX2uoJBX6VVWvhmh7BIPDHNVM5GZjwWORYgk",
    dp: "C2c8sa6wx2uk5Dcv7inAycr83PKgciYrCwG78-AC0IfGIu-lTYsZSG1ov2FQ3n5WYMWYQC_Vo5EwugiPJz_V3onBmQF53HOFefbSjXvYwNotQcyRUG5X9qIuOtGCH949H4QED6vK_u0NH-JgzLUlamwoFYbrXzwch6CCYKs2ukE",
    dq: "hbtRloDLclHwUqr2yvzDV0IFbozYjtF706x-VfXEcnXB6ls34TBYirFLJZIH7H9KeseEVkz7pY_k5555QlCV9kbebxYXl9RtiiJ-BW6yH4d4caPeYIfU9MweUQxVQWKUUkWfOHcDrCFvKZlR9Vzzjt7HKtKX9mr0bCKQcIf9baE",
    qi: "a-7hUTTnclUPKOfSgH8zEKGJ-AvdFEzxvZ5sq46Qf2MbORxVjN4dJamVvM-FoqcwN-9cuUlyr9bSFTwUBW4vXa8Xj9a8JfViuMCqzR-mL1rGIUQ5ARGhNcSsRlyKTqz5BlWlVKmXIx_p-DeVwPWiJJy4k_FqyBxrnxkzomHfrxk",
};
var rsaOaepParams = {
    name: "rsa-oaep",
    label: asciiToUint8Array("WebKit.org"),
}
var expectedPlainText = "Hello, World!";

crypto.subtle.importKey("jwk", jwkKey, {name: "RSA-OAEP", hash: "SHA-1"}, extractable, ["decrypt"]).then(function(key) {
    return crypto.subtle.decrypt(rsaOaepParams, key, cipherText);
}).then(function(result) {
    plainText = result;

    shouldBe("bytesToASCIIString(plainText)", "expectedPlainText");

    finishJSTest();
});
