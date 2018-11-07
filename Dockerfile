# Start with nginx alpine
FROM nginx:1.15-alpine
# Copy nginx configuration file(s)
COPY etc/nginx/*.conf /etc/nginx/conf.d/
# Remove default nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf
# Copy dist/ to /usr/share/nginx/html/
COPY dist/ /usr/share/nginx/html/
# Application should be accessible on port 80
# Note: This is the default port exposed by the nginx image
