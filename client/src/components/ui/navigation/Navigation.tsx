import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Cart } from "../../../features/cart/components/cart";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  Form as RouterForm,
  useNavigate,
  createSearchParams,
  useSearchParams,
  useLocation,
  useSubmit,
  useLoaderData,
} from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { logout } from "../../../features/authentication/services/logoutServices";
import Logout from "../../../features/authentication/components/logout/logout";
import { useUser } from "../../../features/authentication/context/AuthContext";
import $ from "jquery";
import { queryClient } from "../../../context/queryProvider";
import fetchProducts from "../../../features/products/services/fetchProducts";

export default function Navigation() {
  const authState = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const submit = useSubmit();
  const params = location.search;
  const q = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  //use for dynamic filtering of search
  //need to setup fucntionality to manually load in data if products is empty
  const productsQuery = () => ({
    queryKey: ["products"],
  });

  const [allProducts, setProducts] = useState("");
  const [filteredProducts, setFilteredProducts] = useState("");

  useEffect(() => {
    const productsQuery = () => ({
      queryKey: ["products"],

      queryFn: async () => {
        const products = await fetchProducts();
        if (!products) {
          throw new Response("", {
            status: 404,
            statusText: "Not Found",
          });
        }

        return products;
      },
    });

    const ProductsLoader = async () => {
      const query = productsQuery();

      // ⬇️ return data or fetch it

      return (
        queryClient.getQueryData(query.queryKey) ??
        (await queryClient.fetchQuery(query))
      );
    };

    const fetchData = async () => {
      // get the data from the api
      const data = await ProductsLoader();
      // convert the data to json

      // set state with the result
      setProducts(data);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);

    //setSearchParams({ q: searchQuery });
    //document.getElementById("q").value = q;
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    //Navigate to /search/products + search query
    setSearchParams({ q: searchQuery });
    navigate(`/search/products/?q=${encodeURIComponent(searchQuery)}`);
    // navigate({
    //   pathname: "/search/products",
    //   search: `?${createSearchParams(params)}`,
    // });
  };
  return (
    <header style={{ height: "88px" }}>
      {/* <Navbar expand="lg" className="bg-body-tertiary">
        <Container className="">
          <Nav className="">
            <Navbar.Brand as={Link} to="/">
              E-Commerce
            </Navbar.Brand>
          </Nav>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" style={{ flex: "0 1 900px" }}>
            <Nav style={{ flex: "1 1 100%" }}>
              <Form className="d-flex w-100">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 w-100"
                  aria-label="Search"
                />
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary pb-4"
        data-bs-theme="auto"
      >
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="">
              <Navbar.Brand as={Link} to="/">
                E-Commerce
              </Navbar.Brand>
            </Nav>
            <div
              style={{
                flex: "1 1 50%",
              }}
            >
              <div
                style={{
                  position: "static",
                  height: "auto",
                  display: "block",
                }}
              >
                <RouterForm
                  className="w-50"
                  role="search"
                  onSubmit={handleSubmit}
                >
                  <Form.Control
                    type="search"
                    placeholder="Search..."
                    className="me-2 w-100"
                    id="q"
                    aria-label="Search"
                    name="q"
                    value={searchQuery}
                    // defaultValue={q}
                    onChange={(e) => {
                      //console.log(products);

                      // e.preventDefault();
                      const isFirstSearch = q == null;
                      setSearchQuery(e.target.value);

                      if (e.target.value === "" || e.target === null) {
                        $("#dynamic-search").css("opacity", "0");
                        setFilteredProducts("");
                      } else {
                        const filtered = allProducts.filter((el) =>
                          el.name
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase())
                        );

                        setFilteredProducts(filtered);
                        // filter product search result
                        $("#dynamic-search").css("opacity", "1");
                      }

                      // $(".dropdown").addClass("show");
                      // $(".dropdown-toggle").addClass("show");
                      $(".dropdown-menu").toggleClass("show");
                      // submit(e.currentTarget.form, {
                      //   replace: !isFirstSearch,
                      //   action: `/search/products?q=${encodeURIComponent(
                      //     searchQuery
                      //   )}`,
                      // });
                    }}

                    // onKeyDown={(event) => {
                    //   if (event.key === "Enter") {
                    //     event.preventDefault();
                    //     //Navigate to /search/products + search query
                    //     navigate({
                    //       pathname: "/search/products",
                    //       search: `?${createSearchParams(params)}`,
                    //     });
                    //   }
                    // }}
                  />
                </RouterForm>
                <div style={{ position: "relative" }}>
                  <div
                    id="dynamic-search"
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      right: "0",
                      zIndex: "100",
                      transform: `translateY(8px)`,
                      opacity: "0",
                    }}
                  >
                    <div style={{ maxHeight: "80vh", overflowY: "scroll" }}>
                      {/* {filteredProducts != ""  ? } */}
                      {searchQuery != "" && filteredProducts === "" ? (
                        <p>No results</p>
                      ) : (
                        // <ul>
                        // filteredProducts.map((el) => {

                        //       <li key={el._id}>
                        //         <div>
                        //           <p>{el.name}</p>
                        //         </div>
                        //       </li>

                        // })
                        // </ul>

                        <div>
                          {filteredProducts.length > 0
                            ? filteredProducts?.map((el) => {
                                return (
                                  <div key={el._id}>
                                    {/* TODO: Create links that link to the given product */}

                                    <Link
                                      to={`/products/${el._id}`}
                                      style={{ textDecoration: "none" }}
                                    >
                                      <span> {el.name}</span>{" "}
                                    </Link>
                                  </div>
                                );
                              })
                            : ""}
                        </div>
                      )}
                      {/* <p>test</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Nav className="">
              <Nav.Link
                as={NavLink}
                to="/"
                style={({ isActive, isPending }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isPending ? "red" : "black",
                  };
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/products"
                style={({ isActive, isPending }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isPending ? "red" : "black",
                  };
                }}
              >
                Products
              </Nav.Link>
            </Nav>

            {!authState.user ? (
              <Nav>
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  style={({ isActive, isPending }) => {
                    return {
                      fontWeight: isActive ? "bold" : "normal",
                      color: isPending ? "red" : "black",
                    };
                  }}
                >
                  Login
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <NavDropdown
                  title={authState?.user.firstName}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item
                    as={NavLink}
                    to="/account"
                    style={({ isActive, isPending }) => {
                      return {
                        fontWeight: isActive ? "bold" : "normal",
                        color: isPending ? "red" : "black",
                        backgroundColor: isActive ? "inherit" : "inherit",
                      };
                    }}
                  >
                    Account
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={NavLink}
                    to="/account/orders"
                    style={({ isActive, isPending }) => {
                      return {
                        fontWeight: isActive ? "bold" : "normal",
                        color: isPending ? "red" : "black",
                        backgroundColor: isActive ? "inherit" : "inherit",
                      };
                    }}
                  >
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item href="">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <Logout click={logout} />{" "}
                </NavDropdown>
                <Navbar.Text>
                  Signed in as: {authState.user.firstName}
                </Navbar.Text>
              </Nav>
            )}

            {authState.user?.role === "admin" ? (
              <Nav>
                <Nav.Link as={NavLink} to="/admindashboard">
                  Admin
                </Nav.Link>
              </Nav>
            ) : (
              ""
            )}
          </Navbar.Collapse>
          <Cart />
        </Container>
      </Navbar>
    </header>
  );
}
