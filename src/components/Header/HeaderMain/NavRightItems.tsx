import { useLocation } from 'react-router-dom';

import { useHeaderLayoutContext } from '@contexts/HeaderLayoutContext';

import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import SubMenuItem from './SubMenuItem';

export default function NavRightItems() {
  const { setHeaderTopShown, setHeaderMainLayout } = useHeaderLayoutContext();
  const currentPage = useLocation();

  return (
    <>
      <MenuItem url="/about" text="About">
        <SubMenu>
          <SubMenuItem url="/about-right" text="Sidebar">
            <SubMenu>
              <SubMenuItem url="/about-right" text="Right" />
              <SubMenuItem url="/about-left" text="Left" />
            </SubMenu>
          </SubMenuItem>
        </SubMenu>
      </MenuItem>

      <MenuItem url="/contact" text="Contact">
        <SubMenu>
          <SubMenuItem url="/contact-right" text="Sidebar">
            <SubMenu>
              <SubMenuItem url="/contact-right" text="Right" />
              <SubMenuItem url="/contact-left" text="Left" />
            </SubMenu>
          </SubMenuItem>
        </SubMenu>
      </MenuItem>

      <MenuItem url="/" text="Features">
        <SubMenu>
          <SubMenuItem url="/" text="Header layout">
            <SubMenu>
              <SubMenuItem url="/" text="Header style">
                <SubMenu>
                  <SubMenuItem
                    url={currentPage.pathname}
                    onClick={() => {
                      setHeaderTopShown(true);
                      setHeaderMainLayout('blog');
                    }}
                    text="Blog"
                  ></SubMenuItem>
                  <SubMenuItem
                    url={currentPage.pathname}
                    onClick={() => {
                      setHeaderTopShown(false);
                      setHeaderMainLayout('minimal');
                    }}
                    text="Minimal"
                  ></SubMenuItem>
                </SubMenu>
              </SubMenuItem>
              <SubMenuItem url="/" text="Header top">
                <SubMenu>
                  <SubMenuItem url={currentPage.pathname} onClick={() => setHeaderTopShown(true)} text="Shown"></SubMenuItem>
                  <SubMenuItem url={currentPage.pathname} onClick={() => setHeaderTopShown(false)} text="Hidden"></SubMenuItem>
                </SubMenu>
              </SubMenuItem>
            </SubMenu>
          </SubMenuItem>
          <SubMenuItem url="/404" text="404" />
        </SubMenu>
      </MenuItem>
    </>
  );
}
