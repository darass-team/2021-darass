package com.darass.darass.auth.oauth.api.domain;

import com.darass.darass.exception.ExceptionWithMessageAndCode;
import org.springframework.stereotype.Component;

@Component
public class OAuthProviderFactory {

    private final KaKaoOAuthProvider kaKaoOAuthProvider;
    private final NaverOAuthProvider naverOAuthProvider;
    private final GithubOAuthProvider githubOAuthProvider;

    public OAuthProviderFactory(KaKaoOAuthProvider kaKaoOAuthProvider,
        NaverOAuthProvider naverOAuthProvider, GithubOAuthProvider githubOAuthProvider) {
        this.kaKaoOAuthProvider = kaKaoOAuthProvider;
        this.naverOAuthProvider = naverOAuthProvider;
        this.githubOAuthProvider = githubOAuthProvider;
    }

    public OAuthProvider getOAuthProvider(String providerName) {
        if (providerName.equalsIgnoreCase(KaKaoOAuthProvider.NAME)) {
            return kaKaoOAuthProvider;
        }
        if (providerName.equalsIgnoreCase(NaverOAuthProvider.NAME)) {
            return naverOAuthProvider;
        }
        if (providerName.equalsIgnoreCase(GithubOAuthProvider.NAME)) {
            return githubOAuthProvider;
        }
        throw ExceptionWithMessageAndCode.INVALID_OAUTH_PROVIDER.getException();
    }

}
