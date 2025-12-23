package com.ahrorovk.web4.security;

import com.ahrorovk.web4.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        logger.info("JwtAuthenticationFilter: Processing request to " + request.getRequestURI());
        logger.info("JwtAuthenticationFilter: Authorization header: " + (authHeader != null ? (authHeader.length() > 20 ? authHeader.substring(0, 20) + "..." : authHeader) : "NULL"));

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            logger.warn("JwtAuthenticationFilter: No valid Authorization header found for " + request.getRequestURI());
            filterChain.doFilter(request, response);
            return;
        }

        try {
            jwt = authHeader.substring(7);
            logger.info("JwtAuthenticationFilter: JWT token extracted, length: " + jwt.length());
            username = jwtService.extractUsername(jwt);
            logger.info("JwtAuthenticationFilter: Extracted username: " + username);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                logger.info("JwtAuthenticationFilter: Loading user details for: " + username);
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
                logger.info("JwtAuthenticationFilter: Validating token for user: " + username);
                if (jwtService.validateToken(jwt, username)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    logger.info("JwtAuthenticationFilter: Authentication SUCCESSFUL for user: " + username);
                } else {
                    logger.error("JwtAuthenticationFilter: Token validation FAILED for user: " + username);
                }
            } else {
                if (username == null) {
                    logger.error("JwtAuthenticationFilter: Username is null after extraction");
                } else {
                    logger.info("JwtAuthenticationFilter: Authentication already exists for user: " + username);
                }
            }
        } catch (Exception e) {
            logger.error("JwtAuthenticationFilter: JWT authentication failed for request " + request.getRequestURI() + ": " + e.getMessage(), e);
        }
        
        filterChain.doFilter(request, response);
    }
}


