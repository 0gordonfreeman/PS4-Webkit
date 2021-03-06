importScripts('../../../../resources/js-test-pre.js');
importScripts("../../../resources/common.js");

description("Test importing a JWK RSA-OAEP public key with SHA-1 in workers.");
jsTestIsAsync = true;

var jwkKey = {
    kty: "RSA",
    alg: "RSA-OAEP",
    use: "enc",
    key_ops: ["encrypt", "wrapKey"],
    ext: true,
    n: "rcCUCv7Oc1HVam1DIhCzqknThWawOp8QLk8Ziy2p10ByjQFCajoFiyuAWl-R1WXZaf4xitLRracT9agpzIzc-MbLSHIGgWQGO21lGiImy5ftZ-D8bHAqRz2y15pzD4c4CEou7XSSLDoRnR0QG5MsDhD6s2gV9mwHkrtkCxtMWdBi-77as8wGmlNRldcOSgZDLK8UnCSgA1OguZ989bFyc8tOOEIb0xUSfPSz3LPSCnyYz68aDjmKVeNH-ig857OScyWbGyEy3Biw64qun3juUlNWsJ3zngkOdteYWytx5Qr4XKNs6R-Myyq72KUp02mJDZiiyiglxML_i3-_CeecCw",
    e: "AQAB"
};
var extractable = true;

shouldReject('crypto.subtle.importKey("jwk", jwkKey, {name: "RSA-OAEP", hash: "sha-1"}, extractable, ["decrypt", "unwrapKey"])');

debug("Importing a key...");
crypto.subtle.importKey("jwk", jwkKey, {name: "RSA-OAEP", hash: "SHA-1"}, extractable, ["encrypt", "wrapKey"]).then(function(result) {
    publicKey = result;

    shouldBe("publicKey.toString()", "'[object CryptoKey]'");
    shouldBe("publicKey.type", "'public'");
    shouldBe("publicKey.extractable", "true");
    shouldBe("publicKey.algorithm.name", "'RSA-OAEP'");
    shouldBe("publicKey.algorithm.modulusLength", "2048");
    shouldBe("bytesToHexString(publicKey.algorithm.publicExponent)", "'010001'");
    shouldBe("publicKey.algorithm.hash.name", "'SHA-1'");
    shouldBe("publicKey.usages", "['encrypt', 'wrapKey']");

    finishJSTest();
});
