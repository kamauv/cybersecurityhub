_________
something small about the app
_________
1. routes
    i. homepage (/app/page.tsx) - /
        this is the landing page of the site
    ii. admin (/app/admin) - /admin
        these are the pages for the admin user to manage the content of the site they include
        a. admin home (/app/admin/page.tsx) - /admin
            this is the admins main page and it contains a full list of all the articles in the site 
        b. create article (/app/admin/create-artcle/page.tsx) - /admin/create-article
            this page contains the form form creating new articles
        c. update article (/app/admin/update-article/[articleSlug]/page.tsx) - /admin/update-artcle/[articleSlug]
            this is the page for updating a single article details
    iii. artcle (article/[articleSlug]/page.tsx) - /article/[articleSlug]
        this is the page for viewing a single articles details 
    iv. article (articles/page.tsx) - /articles
        this page contains a list of all articles in the site
    v. category (category/[categorySlug]/page.tsx) - /category/[categorySlug]
        this one contains all articles belonging to a single category