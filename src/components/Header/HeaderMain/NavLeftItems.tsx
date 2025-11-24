import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import SubMenuItem from './SubMenuItem';

export default function NavLeftItems() {
  return (
    <>
      <MenuItem url="/" text="Home">
        <SubMenu>
          <SubMenuItem url="/" text="Main" />
          <SubMenuItem url="/home-classic" text="Classic" />
          <SubMenuItem url="/home-magazine" text="Magazine" />
          <SubMenuItem url="/home-minimal" text="Minimal" />
        </SubMenu>
      </MenuItem>

      <MenuItem url="/blog" text="Posts">
        <SubMenu>
          <SubMenuItem url="/blog" text="Posts page">
            <SubMenu>
              <SubMenuItem url="/blog" text="Layout style">
                <SubMenu>
                  <SubMenuItem url="/blog?layout=wide" text="Wide"></SubMenuItem>
                  <SubMenuItem url="/blog?layout=wide-small-small" text="Wide then small">
                    <SubMenu>
                      <SubMenuItem url="/blog?layout=wide-small-small" text="Image small"></SubMenuItem>
                      <SubMenuItem url="/blog?layout=wide-small-half" text="Image half"></SubMenuItem>
                      <SubMenuItem url="/blog?layout=wide-small-large" text="Image large"></SubMenuItem>
                    </SubMenu>
                  </SubMenuItem>
                  <SubMenuItem url="/blog?layout=wide-grid-2" text="Wide then grid">
                    <SubMenu>
                      <SubMenuItem url="/blog?layout=wide-grid-2" text="2 columns"></SubMenuItem>
                      <SubMenuItem url="/blog?layout=wide-grid-3" text="3 columns"></SubMenuItem>
                      <SubMenuItem url="/blog?layout=wide-grid-4" text="4 columns"></SubMenuItem>
                    </SubMenu>
                  </SubMenuItem>
                  <SubMenuItem url="/blog?layout=grid-2" text="Grid">
                    <SubMenu>
                      <SubMenuItem url="/blog?layout=grid-2" text="2 columns"></SubMenuItem>
                      <SubMenuItem url="/blog?layout=grid-3" text="3 columns"></SubMenuItem>
                      <SubMenuItem url="/blog?layout=grid-4" text="4 columns"></SubMenuItem>
                    </SubMenu>
                  </SubMenuItem>
                  <SubMenuItem url="/blog?layout=small-small" text="Small">
                    <SubMenu>
                      <SubMenuItem url="/blog?layout=small-small" text="Image small"></SubMenuItem>
                      <SubMenuItem url="/blog?layout=small-half" text="Image half"></SubMenuItem>
                      <SubMenuItem url="/blog?layout=small-large" text="Image large"></SubMenuItem>
                    </SubMenu>
                  </SubMenuItem>
                </SubMenu>
              </SubMenuItem>
              <SubMenuItem url="/blog" text="Sidebar">
                <SubMenu>
                  <SubMenuItem url="/blog" text="Right"></SubMenuItem>
                  <SubMenuItem url="/blog-left" text="Left"></SubMenuItem>
                  <SubMenuItem url="/blog-hidden" text="Hidden"></SubMenuItem>
                </SubMenu>
              </SubMenuItem>
            </SubMenu>
          </SubMenuItem>

          <SubMenuItem url="/blog/dune-walk" text="Single post">
            <SubMenu>
              <SubMenuItem url="/blog/dune-walk" text="Post header">
                <SubMenu>
                  <SubMenuItem url="/blog/dune-walk" text="Outside">
                    <SubMenu>
                      <SubMenuItem url="/blog/dune-walk" text="Above"></SubMenuItem>
                      <SubMenuItem url="/blog/old-town-centre" text="Beside"></SubMenuItem>
                    </SubMenu>
                  </SubMenuItem>
                  <SubMenuItem url="/blog/beach-adventure" text="Split">
                    <SubMenu>
                      <SubMenuItem url="/blog/sweet-coffee" text="Narrow"></SubMenuItem>
                      <SubMenuItem url="/blog/beach-adventure" text="Wide"></SubMenuItem>
                      <SubMenuItem url="/blog/boho-fashion" text="Full width"></SubMenuItem>
                    </SubMenu>
                  </SubMenuItem>
                  <SubMenuItem url="/blog/beautiful-bouquet" text="Overlay">
                    <SubMenu>
                      <SubMenuItem url="/blog/fields-of-daisies" text="Narrow"></SubMenuItem>
                      <SubMenuItem url="/blog/beautiful-bouquet" text="Wide"></SubMenuItem>
                      <SubMenuItem url="/blog/rustic-decor" text="Full width"></SubMenuItem>
                    </SubMenu>
                  </SubMenuItem>
                </SubMenu>
              </SubMenuItem>
              <SubMenuItem url="/blog/dune-walk" text="Sidebar">
                <SubMenu>
                  <SubMenuItem url="/blog/dune-walk" text="Right"></SubMenuItem>
                  <SubMenuItem url="/blog/sweet-coffee" text="Left"></SubMenuItem>
                  <SubMenuItem url="/blog/beautiful-bouquet" text="Hidden"></SubMenuItem>
                </SubMenu>
              </SubMenuItem>
            </SubMenu>
          </SubMenuItem>

          <SubMenuItem url="/category/photography" text="Categories" />
          <SubMenuItem url="/tag/beach" text="Tags" />
          <SubMenuItem url="/search/fashion" text="Search" />
          <SubMenuItem url="/author/lucid-themes" text="Author" />
        </SubMenu>
      </MenuItem>

      <MenuItem url="/shop" text="Shop">
        <SubMenu>
          <SubMenuItem url="/product/cozy-sweater" text="Single product">
            <SubMenu>
              <SubMenuItem url="/product/cozy-sweater" text="Product type">
                <SubMenu>
                  <SubMenuItem url="/product/cozy-sweater" text="Variable" />
                  <SubMenuItem url="/product/handmade-bonnet" text="Simple" />
                </SubMenu>
              </SubMenuItem>
            </SubMenu>
          </SubMenuItem>
          <SubMenuItem url="/product-category/scarves" text="Categories" />
          <SubMenuItem url="/product-tag/cozy" text="Tags" />
          <SubMenuItem url="/cart" text="Cart" />
          <SubMenuItem url="/checkout" text="Checkout" />
          <SubMenuItem url="/account" text="Account">
            <SubMenu>
              <SubMenuItem url="/account" text="Dashboard" />
              <SubMenuItem url="/login" text="Login" />
            </SubMenu>
          </SubMenuItem>
        </SubMenu>
      </MenuItem>
    </>
  );
}
