import { Link, useLocation } from "@reach/router";

const BreadcrumbNav = () => {
    const location = useLocation();
    let currentLink = "";

    const exceptionRoutes = [
        { route: 'conversation/tags/', filter: 'tags' },
    ];

    const crumbs = location.pathname.split("/").filter(crumb => crumb !== '');

    const getBreadCrumbsFromUrl = () => {
        const resultCrumbs = exceptionBreadcrumb(crumbs, exceptionRoutes);
        return resultCrumbs;
    };

    const exceptionBreadcrumb = (crumbs, routes) => {
        for (const route of routes) {
            if (location.pathname.includes(route.route)) {
                crumbs = crumbs.filter(crumb => crumb !== route.filter);
            }
        }

        return crumbs;
    };

    const resultCrumbs = getBreadCrumbsFromUrl();

    const breadcrumbComponents = resultCrumbs.map((crumb, index) => {
        if (/^[0-9]*$/.test(crumb)) { return }
        currentLink += `/${crumb}`;
        return (
            <li key={index} className="breadcrumb-item">
                {index === resultCrumbs.length - 1 ? (
                    crumb.charAt(0).toUpperCase() + crumb.slice(1)
                ) : (
                    <Link to={currentLink}>
                        {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
                    </Link>
                )}
            </li>
        );
    });

    const backButtonBreadcrumb = () => {
        return <li className="breadcrumb-item">
            <Link to="/">
                <i className="fa fa-chevron-left me-1"></i> Back
            </Link>
        </li>
    }

    return (breadcrumbComponents.length > 1 ? <nav className="row" aria-label="breadcrumb" style={{ padding: "0 0 0 30px" }}>
        <ol className="breadcrumb">
            {crumbs.length == 2 && backButtonBreadcrumb()}
            {crumbs.length > 2 && breadcrumbComponents}
        </ol>
    </nav> : <div style={{ display: "none" }}></div>
    );
};

export default BreadcrumbNav;
